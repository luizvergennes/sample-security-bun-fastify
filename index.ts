import bcrypt from "bcrypt";
import Fastify from "fastify";

interface Produto {
	id: number;
	nome: string;
	preco: number;
}

interface Usuario {
	id: number;
	nome: string;
	email: string;
	senhaHash: string;
}

const app = Fastify({
	logger: true,
});

let produtos: Produto[] = [];
const usuarios: Usuario[] = [];

// Middleware para simular autenticação simples por API Key
app.addHook("preHandler", (request, reply, done) => {
	// Permitir requisições para registro de usuários e listar produtos sem chave
	if (request.routeOptions.url === "/usuarios" && request.method === "POST") {
		done();
		return;
	}
	if (request.routeOptions.url === "/produtos" && request.method === "GET") {
		done();
		return;
	}

	const chaveApi = request.headers.authorization;
	if (!chaveApi || chaveApi !== "ApiKey123") {
		reply.code(401).send({
			erro: "Não autorizado. Forneça uma API Key válida no header Authorization.",
		});
		return;
	}
	done();
});

/**
 * Rotas para produtos
 */

// GET /produtos - retorna a lista de produtos
app.get("/produtos", async (_request, _reply) => {
	return produtos;
});

// POST /produtos - registra um produto sem validação (risco simulado)
app.post<{ Body: { nome: string; preco: number } }>(
	"/produtos",
	async (request, reply) => {
		// Não há validação na simulação de risco
		const { nome, preco } = request.body;

		const novoProduto: Produto = {
			id: produtos.length + 1,
			nome,
			preco,
		};
		produtos.push(novoProduto);
		reply.code(201).send(novoProduto);
	},
);

// DELETE /produtos/:id - remove produto sem autorização (risco)
app.delete<{ Params: { id: string } }>(
	"/produtos/:id",
	async (request, reply) => {
		const id = Number(request.params.id);
		produtos = produtos.filter((produto) => produto.id !== id);
		reply.code(204).send();
	},
);

/**
 * Rotas para usuários
 */

// POST /usuarios - registra um usuário com senha criptografada usando bcrypt
app.post<{ Body: { nome: string; email: string; senha: string } }>(
	"/usuarios",
	async (request, reply) => {
		const { nome, email, senha } = request.body;

		// Hash da senha com bcrypt com custo de 10 rounds
		const senhaHash = await bcrypt.hash(senha, 10);

		const novoUsuario: Usuario = {
			id: usuarios.length + 1,
			nome,
			email,
			senhaHash,
		};

		usuarios.push(novoUsuario);

		// Retornar dados do usuário sem a senha
		reply.code(201).send({
			id: novoUsuario.id,
			nome: novoUsuario.nome,
			email: novoUsuario.email,
		});
	},
);

// GET /usuarios - retorna os usuários sem a senha para simular proteção de dados
app.get("/usuarios", async (_request, _reply) => {
	// Não retorna senha nem hash
	return usuarios.map(({ id, nome, email }) => ({
		id,
		nome,
		email,
	}));
});

// Inicializa o servidor
const start = async () => {
	try {
		await app.listen({ port: 3000, host: "0.0.0.0" });
		app.log.info("Servidor iniciado na porta 3000");
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};
void start();
