import openai
from dotenv import load_dotenv, find_dotenv
import time
import os
import json

_ = load_dotenv(find_dotenv())

client = openai.Client()
assistantID = 'asst_AOpC83OsyaZU85yPtuNfEMFu' #ID do Assistente criado na OpenAI

#Depois da criação do Assistente da OpenAI API
#Partimos para a verificação da thread do usuário

# Nome do arquivo que queremos verificar
threadID_trackRec = "threadID_trackRecord.json"

# Obtém o diretório onde o script está localizado
diretorio_atual = os.path.dirname(os.path.abspath(__file__))

# Concatena o diretório com o nome do arquivo
caminho_arquivo = os.path.join(diretorio_atual, threadID_trackRec)

threadID_dict = {} #Dicinário vazio global para endereçamento das user threads

# Verifica se o arquivo existe e cria um ou utiliza se existir
if os.path.isfile(caminho_arquivo):
    print("Arquivo existe!")
    print("Carregando Arquivo!")
    with open(threadID_trackRec) as f:
        threadID_dict = json.load(f)

else:
    print("Arquivo não encontrado.")
    thread = client.beta.threads.create() #cria de uma thread
    threadID_dict['testUser'] = thread.id
    print('\n', threadID_dict)
    with open("threadID_trackRecord.json", "w", encoding="utf-8") as f:
        json.dump(threadID_dict, f, ensure_ascii=False, indent=4) 

threadID = threadID_dict['testUser']

#Adição de mensagem na thread
message = client.beta.threads.messages.create(
    thread_id=threadID,
    role='user',
    content='Olá, bom dia. Quem é você e O que você faz?' #Pergunta inicial de criação do Assistente
)


#Roda a thread no assistant
run = client.beta.threads.runs.create(
    thread_id=threadID,
    assistant_id=assistantID,
    #instructions='Este é o usuário de testes.' #Isso é um prompt adicional para o agente
)

#Aguarda a thread rodar.
while run.status in ['queued', 'in_progress', 'cancelling']:
    time.sleep(1)
    run = client.beta.threads.runs.retrieve(
        thread_id=threadID,
        run_id=run.id
    )

run.status

#Veirifica a resposta
if run.status == 'completed':
    mensagens = client.beta.threads.messages.list(
        thread_id=threadID
    )
    #print(mensagens) #checagem da classe completa retornada pela API
else:
    print('Errro', run.status)


print(mensagens.data[0].content[0].text.value)

