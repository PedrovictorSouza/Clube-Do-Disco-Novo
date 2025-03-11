import openai
from dotenv import load_dotenv, find_dotenv

_ = load_dotenv(find_dotenv())

client = openai.Client()

#file = client.files.create(
#    file=open('arquivos/supermarket_sales.csv', 'rb'),
#    purpose='assistants'
#)

assitant = client.beta.assistants.create(
    name="polimatIA website chatbot",
    instructions='Você é um chatbot que tem a função de informar clientes sobre as possibilidades \
                  de automação com inteligência artificial para negócios, ajudando empresas a \
                  entender como a IA pode otimizar processos, reduzir custos e aumentar a eficiência.\
                  Você deve fornecer respostas claras, objetivas e convincentes, sempre destacando\
                  os benefícios das soluções da Polimat[IA]',
    #tools=[{'type': 'code_interpreter'}],
    #tool_resources={'code_interpreter': {'file_ids': [file.id]}},
    model='gpt-4o-mini'
)
