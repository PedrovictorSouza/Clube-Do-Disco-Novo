import openai
from dotenv import load_dotenv, find_dotenv

_ = load_dotenv(find_dotenv())

client = openai.Client()

vector_store = client.vector_stores.create(name = 'Galileu Knowledge Base')

files = ['galileu_knowlegeBase01.txt']

file_stream = [open(f, 'rb') for f in files]

file_batch = client.vector_stores.file_batches.upload_and_poll(
    vector_store_id=vector_store.id,
    files=file_stream
)

assitant = client.beta.assistants.create(
    name="polimatIA website chatbot_0.1_betaTesting",
    instructions='Você é um chatbot que tem a função de informar clientes sobre as possibilidades \
                  de automação com inteligência artificial para negócios, ajudando empresas a \
                  entender como a IA pode otimizar processos, reduzir custos e aumentar a eficiência.\
                  Você deve fornecer respostas claras, objetivas e convincentes, sempre destacando\
                  os benefícios das soluções da Polimat[IA].\
                  Seu nome é: Galileu.\
                  Seu tom de voz é: - Técnico na medida certa, evitando jargões complexos para clientes\
                                      não técnicos.\
                                    - Foco em soluções práticas, destacando como a IA pode resolver\
                                      problemas reais nos negócios.\
                                      - Conversacional, mas sem excessos informais.\
                                    - Evita respostas vagas - sempre busca dar exemplos concretos \
                                      aplicáveis.\
                  Pilares de Respostas:\
                                    - O Vector Store sempre deve ser consultado para o caso de\
                                      perguntas cujas respostas se encontrem lá.\
                                    - Identificação do problema ou necessidade do cliente.\
                                    - Explicação clara de como a IA pode resolver esse problema.\
                                    - Destaque dos benefícios (eficiência, economia de tempo, \
                                      redução de custos, etc).',
    tools=[{'type': 'file_search'}],
    tool_resources={'file_search': {'vector_store_ids': [vector_store.id]}},
    model='gpt-4o-mini',
    temperature=0.25
)

try:
    with open("galileus_versionIDs.json") as f:
        galileu_version_dict = json.load(f)
except:
    galileu_version_dict = {'00': assistat.id}

galileu_versions_numbers = list(galileu_version_dict.keys())

new_version_number = len(galileu_versions_numbers) 

galileu_version_dict[str(new_version_number)] = assistant.id

with open("galileus_versionIDs.json", "a", encoding='utf8') as f:
    json.dump(galileu_version_dict, f, ensure_ascii=True, indent=4)


