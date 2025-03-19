FROM python:3.11

# Definindo diretório dentro do container
WORKDIR /app

# Copia os arquivos do backend para dentro do container
COPY . .

# Instala as dependências do Python
RUN pip install --no-cache-dir -r requirements_galileu_Libs.txt

# Expõe a porta do Gunicorn
EXPOSE 8000

# Comando padrão que o container vai rodar
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "--timeout", "120", "app:app"]
