# 🐯 Guia Seres Vivos
Este é um aplicativo mobile desenvolvido em React Native, cujo objetivo é servir como um guia de seres vivos, categorizando os organismos em grupos específicos como Animais, Plantas, Fungos, Monera e Protista. O aplicativo permite ao usuário selecionar uma categoria e explorar informações detalhadas sobre os organismos pertencentes a cada uma delas.
Funcionalidades
- Navegação entre as categorias de seres vivos.
- Exibição de informações detalhadas sobre cada ser vivo de acordo com a categoria.
- Barra de pesquisa para filtrar os itens dentro de cada categoria.
# 🗂️ Estrutura de Diretórios
```
├── assets/                    # Recursos como ícones e animações
├── node_modules/               # Módulos npm instalados
├── screens/                    # Telas do aplicativo
│   ├── HomeScreen.tsx          # Tela inicial com seleção de categorias
│   ├── CategoryScreen.tsx      # Tela de exibição de itens por categoria
├── App.tsx                     # Arquivo principal do aplicativo
├── database.json               # Arquivo JSON simulando uma base de dados
├── package.json                # Dependências e scripts do projeto
├── tsconfig.json               # Configurações do TypeScript
```
# 🛠️ Tecnologias Utilizadas
- React Native: Framework principal para desenvolvimento mobile.
- TypeScript: Superset do JavaScript, adicionando tipagem estática.
- Axios: Biblioteca para fazer requisições HTTP.
- Lottie: Biblioteca para exibir animações Lottie.
- JSON Server: Servidor fake para simular uma API REST com o database.json.
# 🆕 Funcionalidades Futuros
- Adicionar mais categorias de seres vivos.
- Melhorar a interface gráfica com novos layouts e animações.
