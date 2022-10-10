import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import latinize from 'latinize';
import Card from "../components/card";
import "../assets/css/search.scss";
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';

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


    function stringToTime(time) {
        const timeText = time.split(":");
        const hours = parseInt(timeText[0]) * 60 * 60;
        const minutes = parseInt(timeText[1]) * 60;
        const secondsData = hours + minutes;
        return secondsData
    }
    function getTime(seconds) {
        const hoursShow = Math.floor(seconds / 3600);
        let sc = seconds % 3600
        const minutesShow = Math.floor(sc / 60);
        const secondsShow = sc % 60;

        const hourF = twodigits(hoursShow);
        const minuteF = twodigits(minutesShow);
        const secondF = twodigits(secondsShow);

        return (
            <>
                {hourF}:{minuteF}
            </>
        )
    }
    function twodigits(number) {
        return number.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
    }
    const maxLength = Math.max(...data.allStrapiRoute.edges.map(item => item.node.length))
    const minLength = Math.min(...data.allStrapiRoute.edges.map(item => item.node.length))

    const minTime = Math.min(...data.allStrapiRoute.edges.map(item => stringToTime(item.node.time)))
    const maxTime = Math.max(...data.allStrapiRoute.edges.map(item => stringToTime(item.node.time)))

    const minElevation = Math.min(...data.allStrapiRoute.edges.map(item => item.node.stupanie))
    const maxElevation = Math.max(...data.allStrapiRoute.edges.map(item => item.node.stupanie))


    const { filteredData, query } = state
    const hasSearchResults = filteredData && query !== emptyQuery

    const [rangeLength, setRangeLength] = useState([minLength, maxLength])
    const [rangeTime, setRangeTime] = useState([minTime, maxTime])
    const [rangeElevation, setRangeElevation] = useState([minElevation, maxElevation])


    //const posts = hasSearchResults ? filteredData : allPosts;
    if (!hasSearchResults) {
        var finalData = allPosts.edges.filter(function (pilot) {
            const pilotTime = stringToTime(pilot.node.time);
            return pilot.node.length >= rangeLength[0] && pilot.node.length <= rangeLength[1] && pilotTime >= rangeTime[0] && pilotTime <= rangeTime[1] && pilot.node.stupanie >= rangeElevation[0] && pilot.node.stupanie <= rangeElevation[1];
        });
    } else {
        var finalData = filteredData.edges.filter(function (pilot) {
            const pilotTime = stringToTime(pilot.node.time);
            return pilot.node.length >= rangeLength[0] && pilot.node.length <= rangeLength[1] && pilotTime >= rangeTime[0] && pilotTime <= rangeTime[1] && pilot.node.stupanie >= rangeElevation[0] && pilot.node.stupanie <= rangeElevation[1];
        });
    }
    const posts = finalData;

    function logLength(value) {
        setRangeLength(value)
    }
    function logTime(value) {
        setRangeTime(value)
    }
    function logElevation(value) {
        setRangeElevation(value)
    }

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
            <div style={{ maxWidth: '768px', margin: 'auto' }}>
                <h4>cas</h4>
                <Slider range allowCross={false} defaultValue={[minTime, maxTime]} min={minTime} max={maxTime} onChange={logTime} />
            </div>
            <div style={{ maxWidth: '768px', margin: 'auto' }}>
                <h4>dlzka</h4>
                <Slider range allowCross={false} defaultValue={[minLength, maxLength]} min={minLength} max={maxLength} onChange={logLength} />
            </div>
            <div style={{ maxWidth: '768px', margin: 'auto' }}>
                <h4>prevysenie</h4>
                <Slider range allowCross={false} defaultValue={[minElevation, maxElevation]} min={minElevation} max={maxElevation} onChange={logElevation} />
            </div>
            <div className="home_list">
                {posts.map((item, i) => {
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
