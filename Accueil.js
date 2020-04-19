import React from 'react'
import Article from './Article'
import frontMatter from 'front-matter'

var req = require.context('./articles', true, /\.md$/)
const rawArticles = [...req.keys()].map((key) => [
	key.replace('./', '').replace('.md', ''),
	req(key).default,
])
console.log({ rawArticles })

const parsedArticles = rawArticles.map(([id, string]) => ({
	...frontMatter(string),
	id,
}))

export default () => {
	const path = decodeURI(window.location.pathname)

	if (path === '/') return <Liste articles={parsedArticles} />
	const theOne = parsedArticles.find(({ id }) => id === path.replace('/', ''))
	if (theOne) return <Article data={theOne} />

	return <div>Désolé, cette page n'existe pas</div>
}

const Header = () => (
	<header
		css={`
			display: flex;
			flex-direction: column;
			align-items: center;
			> h1 {
				margin-bottom: 0.8rem;
			}
			> p {
				margin-top: 0;
			}
		`}
	>
		<h1>📝 Un blog</h1>
		<p>Quelques idées sur notre environnement, nos villes, les algorithmes</p>
	</header>
)

let Liste = ({ articles }) => (
	<main>
		<Header />
		<section
			css={`
				display: flex;
				flex-direction: column;
				align-items: center;
				aside {
					text-align: center;
				}
			`}
		>
			<header>
				<h2>Articles</h2>
			</header>
			{articles.map((a) => (
				<aside>
					<img css="width: 10rem" src={a.attributes.image}></img>
					<h3>{a.attributes.titre}</h3>
					<p>{a.attributes.résumé}</p>
					<p>
						<a href={'/' + a.id}>
							<em>Lire</em>
						</a>
					</p>
				</aside>
			))}
		</section>
	</main>
)
