from flask import Flask, request, jsonify
from flask_cors import CORS  # Importe o CORS
from dotenv import load_dotenv
import openai
import os
import json
import time

load_dotenv()

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas as rotas

client = openai.Client()

assistantID = 'asst_s9qtZ7lEgKZ9i4W3IajTPIv1'

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    thread_file = "threadID_trackRecord.json"
    if os.path.isfile(thread_file):
        with open(thread_file, "r") as f:
            threadID_dict = json.load(f)
    else:
        threadID_dict = {}
        thread = client.beta.threads.create()
        threadID_dict['testUser'] = thread.id
        with open(thread_file, "w", encoding="utf-8") as f:
            json.dump(threadID_dict, f, ensure_ascii=False, indent=4)
    threadID = threadID_dict.get('testUser')

    client.beta.threads.messages.create(
        thread_id=threadID,
        role='user',
        content=user_message
    )

    run = client.beta.threads.runs.create(
        thread_id=threadID,
        assistant_id=assistantID,
    )

    while run.status in ['queued', 'in_progress', 'cancelling']:
        time.sleep(1)
        run = client.beta.threads.runs.retrieve(
            thread_id=threadID,
            run_id=run.id
        )

    if run.status == 'completed':
        mensagens = client.beta.threads.messages.list(thread_id=threadID)
        resposta = mensagens.data[0].content[0].text.value
        return jsonify({'response': resposta})
    else:
        return jsonify({'error': 'Erro na execução', 'status': run.status}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
