const { Client } = require('pg');

exports.handler = async (event, context) => {
    // 1. Configura a conexão com o banco de dados Neon
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false } 
    });

    try {
        await client.connect();
        
        // 2. Fazendo um teste: buscando todos os clientes do seu banco Neon
        const resultado = await client.query('SELECT * FROM cliente;');
        
        await client.end();

        // 3. Devolve os dados para a tela
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(resultado.rows)
        };

    } catch (erro) {
        console.error("Erro na API:", erro);
        return {
            statusCode: 500,
            body: JSON.stringify({ mensagem: "Erro ao conectar no banco", detalhe: erro.message })
        };
    }
};
