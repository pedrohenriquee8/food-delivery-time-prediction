# Predição de Tempo de Entrega de Pedidos em Delivery

Este projeto final, desenvolvido como requisito avaliativo da disciplina de Inteligência Computacional do 7º período do Bacharelado em Sistemas de Informação do Instituto Federal de Alagoas – Campus Arapiraca, tem como objetivo prever o tempo de entrega de pedidos em serviços de delivery a partir de um dataset público disponibilizado na plataforma [Kaggle](https://www.kaggle.com/).

Integrantes:

| Nome                            | E-mail institucional    |
| ------------------------------- | ----------------------- |
| Dionísio Barbosa da Silva Leite | dbsl1@aluno.ifal.edu.br |
| Maria Izabel Lemos da Silva     | mils2@aluno.ifal.edu.br |
| Pedro Henrique Bastos de Brito  | phbb1@aluno.ifal.edu.br |
| Thiago de Almeida Pereira Filho | tapf1@aluno.ifal.edu.br |

## Problema

### Contexto

Em plataformas de delivery de alimentos, informar com precisão quanto tempo um pedido levará para chegar ao cliente é essencial, tendo em vista que estimativas incorretas podem gerar insatisfação, cancelamentos e dificuldades no planejamento logístico das entregas. O tempo total de entrega depende de fatores distintos: distância percorrida, condições climáticas, intensidade do trânsito, horário do pedido, tipo de veículo utilizado, tempo de preparo da refeição e experiência do entregador. Portanto, compreender como essas variáveis influenciam o tempo final permite antecipar atrasos e apoiar decisões operacionais.

### Definição do problema

Dado um conjunto de pedidos com informações sobre rota, ambiente, operação e entregador, o projeto busca **prever o tempo total de entrega em minutos** (`Delivery_Time_min`). Trata-se de um problema de **regressão supervisionada**: a partir de exemplos históricos em que o tempo real de entrega é conhecido, o modelo deve aprender a estimar esse valor para novos pedidos com características semelhantes.

### Objetivo

Construir um modelo de Inteligência Computacional capaz de estimar `Delivery_Time_min` utilizando as variáveis disponíveis no dataset, exceto `Order_ID`, que serve apenas como identificador.

### Entrada e saída

| Papel                  | Variáveis                                                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Entrada (features)** | `Distance_km`, `Weather`, `Traffic_Level`, `Time_of_Day`, `Vehicle_Type`, `Preparation_Time_min`, `Courier_Experience_yrs` |
| **Saída (alvo)**       | `Delivery_Time_min`                                                                                                        |

## Dados

O dataset original está em `data/raw/food-delivery-times.csv`, sem alterações.

| Informação    | Valor               |
| ------------- | ------------------- |
| Registros     | 1.000               |
| Formato       | CSV                 |
| Variável alvo | `Delivery_Time_min` |

### Variáveis

| Coluna                   | Descrição                        |
| ------------------------ | -------------------------------- |
| `Order_ID`               | Identificador do pedido          |
| `Distance_km`            | Distância da entrega (km)        |
| `Weather`                | Condição climática               |
| `Traffic_Level`          | Nível de trânsito                |
| `Time_of_Day`            | Período do dia                   |
| `Vehicle_Type`           | Tipo de veículo do entregador    |
| `Preparation_Time_min`   | Tempo de preparo do pedido (min) |
| `Courier_Experience_yrs` | Experiência do entregador (anos) |
| `Delivery_Time_min`      | Tempo total de entrega (min)     |

## Estrutura atual do projeto

```text
food-delivery-time-prediction/
├── data/
│   └── raw/
│       └── food-delivery-times.csv
|── metrics/
|   └── metrics.py
|── models_saved/
|   └── gradient_boosting_model.pkl
|   └── linear_model.pkl
|   └── random_forest_model.pkl
|   └── xgboost_model.pkl
|── src/
|   └── features/
|       └── feature_engineering.py
|   └── models/
|       └── train.py
|   └── preprocessing/
|       └── clear_data.py
|       └── data_splitter.py
|       └── eda.py
|       └── pipeline_preprocess.py
├── .gitignore
├── main.py
├── README.md
└── requirements.txt
```
## Execução

### Pré‑requisitos

- Python 3.10 ou superior
- Git

1. **Clone o repositório**

   ```bash
   git clone https://github.com/pedrohenriquee8/food-delivery-time-prediction.git
   cd food-delivery-time-prediction

2. **Crie e ative um ambiente virtual**

    ```bash
    # Linux / macOS
    python -m venv venv
    source venv/bin/activate

    # Windows
    python -m venv venv
    venv\Scripts\activate
    Instale as dependências

3. **Instale as dependências necessárias**

    ```bash
    pip install -r requirements.txt

4. **Execute o comando:**

    ```bash
    python main.py