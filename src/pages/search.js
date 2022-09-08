import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import latinize from 'latinize';
import Card from "../components/card";
import "../assets/css/search.scss";

const Search = props => {
    const { data } = props
    const allPosts = data.allStrapiRoute

    const emptyQuery = ""

    const [state, setState] = useState({
        filteredData: [],
        query: emptyQuery,
    })

    const handleInputChange = event => {

        const query = event.target.value
        const { data } = props

        const posts = data.allStrapiRoute || []

        const edges = posts.edges.filter(post => {
            const { subtitle, title } = post.node

            const fulltitle = latinize(title + subtitle);
            return (
                fulltitle.toLowerCase().includes(query.toLowerCase())
            )
        });

        const filteredData = { edges: edges };
        setState({
            query,
            filteredData,
        })
    }

    const { filteredData, query } = state
    const hasSearchResults = filteredData && query !== emptyQuery
    const posts = hasSearchResults ? filteredData : allPosts;

    return (
        <main className="home_main" >
            <div className="search_input_wrap">

                <input
                    className="search_input"
                    type="text"
                    aria-label="Search"
                    placeholder="Vyhľadajte túru..."
                    onChange={handleInputChange}
                />
            </div>

            <div className="home_list">
                {posts.edges.map((item, i) => {
                    return (
                        <Card article={item} key={i} />
                    )
                })}
            </div>
        </main>
    )
}

export default Search

export const pageQuery = graphql`
  query {
    allStrapiRoute {
        edges {
          node {
              slug
              title
              subtitle
              time
              length
              level
              tourType
              mountain {
                title
              }
              stupanie
              Route_path {
                time
              }
              image {
                localFile {
                childImageSharp {
                gatsbyImageData(
                  width: 300
                  height: 400
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              )
              }
            }
          }
        }
      }
  }
  }
`
