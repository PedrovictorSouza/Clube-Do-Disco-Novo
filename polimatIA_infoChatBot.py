import openai
from dotenv import load_dotenv, find_dotenv
import time

_ = load_dotenv(find_dotenv())

client = openai.Client()

#Criação do Assistant
assitant = client.beta.assistants.create(
    name="polimatIA website chatbot",
    instructions='Você é um chatbot que tem a função de informar clientes sobre as possibilidades \
                  de automação com inteligência artificial para negócios, ajudando empresas a \
                  entender como a IA pode otimizar processos, reduzir custos e aumentar a eficiência.\
                  Você deve fornecer respostas claras, objetivas e convincentes, sempre destacando\
                  os benefícios das soluções da Polimat[IA].\
                  Seu tom de voz é: - Técnico na medida certo, evitando jargões complexos para clientes\
                                      não técnicos.\
                                    - Foco em soluções práticas, destacando como a IA pode resolver\
                                      problemas reais nos negócios.\
                                      - Conversacional, mas sem excessos informais.\
                                    - Evita respostas vagas - sempre busca dar exemplos concretos \
                                      aplicáveis.\
                  Pilares de Respostas:\
                                    - Identificação do problema ou necessidade do cliente.\
                                    - Explicação clara de como a IA pode resolver esse problema.\
                                    - Destaque dos benefícios (eficiência, economia de tempo, \
                                      redução de custos, etc).',
    #tools=[{'type': 'code_interpreter'}],
    #tool_resources={'code_interpreter': {'file_ids': [file.id]}},
    model='gpt-4o-mini'
)

#criação de uma thread
thread = client.beta.threads.creat()

#Adição de mensagem na thread
message = client.beta.threads.messages.create(
    thread_id=thread.id,
    role='user',
    content='' #Pergunta inicial de criação do Assistente
)



#Roda a thread no assistant
run = client.beta.threads.runs.create(
    thread_id=thread.id,
    assistant_id=assitant.id,
    instructions='O nome do usuário é Adriano Soares e ele é um usuário Premium.'
)

#Aguarda a thread rodar.
while run.status in ['queued', 'in_progress', 'cancelling']:
    time.sleep(1)
    run = client.beta.threads.runs.retrieve(
        thread_id=thread.id,
        run_id=run.id
    )

run.status

#Veirifica a resposta
if run.status == 'completed':
    mensagens = client.beta.threads.messages.list(
        thread_id=thread.id
    )
    print(mensagens)
else:
    print('Errro', run.status)

#Print da mensagem para o humano
print(mensagens.data[0].content[0].text.value)

