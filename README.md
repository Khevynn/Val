# 🏛️ Olimpo – Gaming Platform

Plataforma voltada para jogadores de **Valorant**, com backend em **Java Spring Boot** e front-end em **React**.  
Este projeto é um ponto de partida para autenticação de usuários e integração com recursos de jogos competitivos.

---

## 🛠️ Estrutura do Projeto

```
olimpo/
├── api/     # API Java com Spring Boot
└── client/    # Aplicação React
```

---

## 🔧 API – Backend (Spring Boot)

- 📦 **Framework:** Spring Boot `3.4.4`  
- ☕ **JDK:** Java `17`  
- 🚪 **Porta padrão:** `8081`  
- 📁 Local: `/api`

### 📌 Rotas principais

#### 🔹 POST `/user/register`

Registra um novo usuário.

**Payload JSON:**
```json
{
  "user": "nomeDeUsuario",
  "password": "senhaSegura",
  "email": "email@exemplo.com"
}
```

**Respostas:**
- ✅ `201 Created`: Usuário registrado com sucesso.
- ⚠️ `400 Bad Request`: Email ou usuário já cadastrado, ou campos ausentes.

---

#### 🔹 POST `/user/login`

Realiza login do usuário.

**Payload JSON:**
```json
{
  "user": "nomeDeUsuario",
  "password": "senhaSegura"
}
```

**Respostas:**
- ✅ `200 OK`: Login realizado com sucesso.
- ❌ `401 Unauthorized`: Usuário não encontrado ou senha incorreta.

---

## 💻 Client – Frontend (React + Vite)

- ⚛️ **Framework:** React  
- 🚪 **Porta padrão:** `5173` (por padrão, ao rodar `npm run dev`)  
- 📁 Local: `/client`

### 📌 Funcionalidades esperadas (em progresso)

- Formulário de cadastro e login
- Integração com a API via `fetch`/`axios`
- Interface moderna e responsiva com foco em jogadores de FPS

---

## 🚀 Como executar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/Khevynn/Val.git
cd olimpo
```

### 2. Iniciar o backend

```bash
cd api
./mvnw spring-boot:run
```

### 3. Iniciar o frontend

```bash
cd client
npm i
npm run dev
```

---

## 📌 Requisitos

- Java 17+
- Node.js 18+
- Maven (ou usar wrapper `./mvnw`)
- NPM ou Yarn

---

## 📚 Licença

Este projeto está sob a licença MIT.

---

> Desenvolvido com ☕ e 🎮 por [Vitor Miranda]
