import React, { useEffect, useState, useRef, createRef } from 'react';
import { graphql } from "gatsby";
import { GatsbyImage, } from "gatsby-plugin-image";
import "../assets/css/tourguide.scss";
import Seo from "../components/seo";
import { BsListOl, BsFillPauseFill, BsFillPlayFill, BsX } from 'react-icons/bs';
import { useScreenshot, createFileName } from 'use-react-screenshot'


export const query = graphql`
  query NavQuery($slug: String!) {
    strapiRoute(slug: { eq: $slug }) {
      length
      level
      tourType
      Route_path {
        id
        farba
        time
        point {
          strapi_id
          slug
          title
          altitude
          image {
            url
            alternativeText
          }
        }
      }
      map {
        url
      }
      mapJson {
        features {
          type
          geometry {
            coordinates
            type
          }
          properties {
            name
          }
        }
        type
      } 
      mountain {
        title
      }
      region {
        title
      }
      title
      subtitle
      stupanie
      klesanie
      description { 
        data {
          description
        }
      }
      time
      Authors {
        author {
          name
          thumbnail {
            localFile {
              childImageSharp {
                gatsbyImageData(width: 32, height: 32, placeholder: BLURRED)
              }
            }
          }
        }
        date
      }
      image {
        url
        localFile {
          publicURL
          childImageSharp {
            gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
          }
        }
      }

    }
  }
`


const UsingDSG = ({ data }) => {
  const [showTop, setShowTop] = useState(false);
  const [order, setOrder] = useState(0);
  const [routeStatus, setRouteStatus] = useState('onstart');

  const maxPoints = data.strapiRoute.Route_path.length - 1;
  const nextPoint = order + 1;
  const time = data.strapiRoute.Route_path[order].time.split(":");
  const hours = parseInt(time[0]) * 60 * 60;
  const minutes = parseInt(time[1]) * 60;
  const secondsData = hours + minutes;

  const [seconds, setSeconds] = useState(secondsData);
  const [total, setTotal] = useState(0);
  const [start, setStart] = useState(false);
  const [expired, setExpired] = useState(false);
  const [startExtra, setStartExtra] = useState(false);
  const [extratime, setExtratime] = useState(0);

  const intervalRef = useRef();
  const intervalTotalRef = useRef();
  const intervalExtraRef = useRef();
  const intervalDate = useRef();

  const pointHistory = new Array;
  const [allPoints, setAllPoints] = useState(pointHistory);

  const [startDate, setStartDate] = useState(null);
  const [secDate, setSecDate] = useState(0);

  const INTERVAL = 1000;


  //countdown
  useEffect(() => {
    if (start) {
      const tick = () => setSeconds(t => t - 1);
      intervalRef.current = setInterval(tick, INTERVAL);

    } else {
      clearInterval(intervalRef.current);
    }
  }, [start]);

  //intervalDate
  useEffect(() => {
    if (start) {
      const tick = () => setSecDate(Math.floor((Date.now() - startDate) / 1000));
      intervalDate.current = setInterval(tick, INTERVAL);
    } else {
      clearInterval(intervalDate.current);
    }
  }, [start]);

  //extratime
  useEffect(() => {
    if (startExtra) {
      const tick = () => setExtratime(t => t + 1);
      intervalExtraRef.current = setInterval(tick, INTERVAL);
    } else {
      clearInterval(intervalExtraRef.current);
    }
  }, [startExtra]);

  //total time
  useEffect(() => {
    if (expired) {
      if (startExtra) {
        const tickTotal = () => setTotal(t => t + 1);
        intervalTotalRef.current = setInterval(tickTotal, INTERVAL);
      } else {
        clearInterval(intervalTotalRef.current);
      }
      return () => clearInterval(intervalTotalRef.current);
    }
    else {
      if (start) {
        const tickTotal = () => setTotal(t => t + 1);
        intervalTotalRef.current = setInterval(tickTotal, INTERVAL);
      } else {
        clearInterval(intervalTotalRef.current);
      }
      return () => clearInterval(intervalTotalRef.current);
    }

  }, [start, startExtra]);

  useEffect(() => {
    if (seconds === 0) {
      clearInterval(intervalRef.current);
      setExpired(true);
      setStartExtra(true);
      //setStart(false);
      //alert("Expired");
    }
  }, [seconds]);

  useEffect(() => {
    const time = data.strapiRoute.Route_path[order].time.split(":");
    const hours = parseInt(time[0]) * 60 * 60;
    const minutes = parseInt(time[1]) * 60;
    const secondsData = hours + minutes;
    setSeconds(secondsData);
    setExtratime(0);
    if (expired) {
      setStartExtra(false);
    }
  }, [order]);

  //pointlist create
  const createHistory = () => {
    const time = data.strapiRoute.Route_path[order].time.split(":");
    const hours = parseInt(time[0]) * 60 * 60;
    const minutes = parseInt(time[1]) * 60;
    const secondsData = hours + minutes;

    const pointTime = secondsData - seconds + extratime;
    const pointObject = {
      title: data.strapiRoute.Route_path[order].point.title,
      altitude: data.strapiRoute.Route_path[order].point.altitude,
      time: data.strapiRoute.Route_path[order].time,
      color: data.strapiRoute.Route_path[order].farba,
      yourtime: pointTime,
    }
    setAllPoints([...allPoints, pointObject]);
  };

  // idem dalej
  const reset = () => {
    let newOrder = order + 1;
    if (newOrder > maxPoints) {
      newOrder = maxPoints;
    }
    setStartDate(Date.now());
    setStart(true);
    setStartExtra(false);
    setExpired(false);
    setOrder(newOrder);
    setRouteStatus('running');
  };
  //spustit
  const routeStarted = () => {
    setStartDate(Date.now());
    setStart(start => !start);
    if (expired) {
      setStartExtra(startExtra => !startExtra);
    }
    setRouteStatus('running');
  }
  //som tu
  const routeRunning = () => {
    const ms = Math.floor(secDate / 1000);
    const fs = getTime(ms);
    console.log({ fs });

    setStart(false);
    setStartExtra(false);
    createHistory();
    console.log({ startExtra });
    if (nextPoint === maxPoints) {
      setRouteStatus('end');
    } else {
      setRouteStatus('checkpoint');
    }
  }
  //pause button
  const pause = () => {
    if (expired) {
      setStartExtra(startExtra => !startExtra);
    } else {
      setStart(start => !start);
    }
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
        {hourF}:{minuteF}:{secondF}
      </>
    )
  }

  function twodigits(number) {
    return number.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    })
  }


  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0
  });

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };

  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  return (
    <div className="tourguide_cont">

      {routeStatus != 'end' ?

        <div className="tourguide_wrap">
          <div className="tourguide_content">

            <div className={showTop ? "tourguide_topbar show" : "tourguide_topbar"}>
              <div className='tourguide_topbar_table'>
                <div className='tourguide_topbar_row tourguide_topbar_row--head'>
                  <div className='tourguide_topbar_row_name'>
                    hríbik
                  </div>
                  <div className='tourguide_topbar_row_time'>
                    oficiálny čas
                  </div>
                  <div className='tourguide_topbar_row_yourtime'>
                    tvoj čas
                  </div>
                </div>
                <PointsList data={data} allPoints={allPoints} getTime={getTime} order={order} />
              </div>
              <div className='tourguide_topbar_bar'>
                {!showTop ?
                  <>
                    <button onClick={() => setShowTop(showTop => !showTop)}>
                      <BsListOl />
                      <span>
                        všetky body
                      </span>
                    </button>
                    <span>
                      <small>
                        Celkový čas
                      </small>
                      <b>
                        {getTime(total)}
                      </b>
                    </span>
                  </>
                  :
                  <>
                    <button onClick={() => setShowTop(showTop => !showTop)}>
                      <BsX />
                      <span>
                        zavrieť
                      </span>
                    </button>
                    <span>
                      <small>
                        Celkový čas
                      </small>
                      <b>
                        {getTime(total)}
                      </b>
                    </span>
                  </>
                }

              </div>
            </div>
            <div className='tourguide_current'>

              <Currentpoint start={start} routeStatus={routeStatus} data={data} order={order} nextPoint={nextPoint} />
              {routeStatus === 'onstart' ? null :
                <div className='tourguide_time'>
                  <div>
                    <span>
                      čas k hríbiku
                    </span>
                    <b>
                      {getTime(seconds)}
                    </b>
                    {expired ?
                      <div style={{ color: 'red' }} className='tourguide_extratime'>
                        {getTime(extratime)}
                      </div>
                      : null}
                  </div>
                  <ButtonPause routeStatus={routeStatus} start={start} startExtra={startExtra} pause={pause} expired={expired} />
                </div>
              }
            </div>
            <Nexpoint start={start} routeStatus={routeStatus} data={data} order={order} nextPoint={nextPoint} maxPoints={maxPoints} />
            <StartButton routeStatus={routeStatus} routeStarted={routeStarted} reset={reset} routeRunning={routeRunning} />

          </div>
          <BackImage routeStatus={routeStatus} data={data} order={order} />

        </div>

        :
        <div className="tourguide_wrap end">
          <div className="tourguide_content">
            <div ref={ref} className='tourguide_screenshot'>
              <div style={{ backgroundImage: 'url(' + data.strapiRoute.image.localFile.publicURL + ')' }} className='tourguide_route' >
                <h1>
                  <b>
                    {data.strapiRoute.title}
                  </b>
                  <span>
                    {data.strapiRoute.subtitle}
                  </span>
                </h1>
              </div>

              {
                data.strapiRoute.Route_path.map((point, key) => {
                  return (
                    <div className={order === (key - 1) ? 'tourguide_topbar_row active' : 'tourguide_topbar_row'}>
                      <div className='tourguide_topbar_row_name'>
                        <b>
                          {point.point.title}
                        </b>
                        <span>
                          {point.point.altitude} m.n.m.
                        </span>
                      </div>
                      <div className='tourguide_topbar_row_time'>
                        {key === 0 ? "štart" :
                          <div className='tourguide_color'>
                            <span className={data.strapiRoute.Route_path[key - 1].farba}>
                              {data.strapiRoute.Route_path[key - 1].time}
                            </span>
                          </div>
                        }
                      </div>
                      <div className='tourguide_topbar_row_yourtime'>

                        {allPoints[key - 1] ? getTime(allPoints[key - 1].yourtime) : '-'}
                      </div>
                    </div>
                  );
                })
              }
            </div>
            <button onClick={downloadScreenshot}>Download screenshot</button>
          </div>
        </div>
      }
    </div >
  );
}

export default UsingDSG

export const Head = ({ data }) => {

  const seo = {
    metaTitle: data.strapiRoute.title + data.strapiRoute.subtitle,
    metaDescription: data.strapiRoute.description,
    shareImage: data.strapiRoute.image
  }
  return (
    <Seo title={seo.metaTitle} description={seo.metaDescription}>
      <meta property="og:image" content={seo.shareImage} />
    </Seo>
  );
}

const ButtonPause = ({ routeStatus, start, startExtra, pause, expired }) => {
  if (routeStatus === 'running') {
    if (expired) {
      return (
        <button onClick={pause}>
          {startExtra ? <BsFillPauseFill /> : <BsFillPlayFill />}
        </button>
      );
    } else {
      return (
        <button onClick={pause}>
          {start ? <BsFillPauseFill /> : <BsFillPlayFill />}
        </button>
      );
    }
  }
}

const PointsList = ({ data, allPoints, getTime, order }) => {
  return (
    <>
      {
        data.strapiRoute.Route_path.map((point, key) => {
          return (
            <div className={order === (key - 1) ? 'tourguide_topbar_row active' : 'tourguide_topbar_row'}>
              <div className='tourguide_topbar_row_name'>
                <b>
                  {point.point.title}
                </b>
                <span>
                  {point.point.altitude} m.n.m.
                </span>
              </div>

              <div className='tourguide_topbar_row_time'>

                {key === 0 ? "štart" :
                  <div className='tourguide_color'>
                    <span className={data.strapiRoute.Route_path[key - 1].farba}>
                      {data.strapiRoute.Route_path[key - 1].time}
                    </span>
                  </div>
                }
              </div>
              <div className='tourguide_topbar_row_yourtime'>

                {allPoints[key - 1] ? getTime(allPoints[key - 1].yourtime) : '-'}
              </div>
            </div>
          );
        })
      }
    </>
  );
}


const Currentpoint = ({ start, routeStatus, data, order, nextPoint }) => {
  if (!start && routeStatus === 'onstart')
    return (
      <div className='tourguide_current_point'>
        <span className='tourguide_label'>
          začiatok
        </span>
        <h2>
          {data.strapiRoute.Route_path[order].point.title}
        </h2>
        <span className='tourguide_altitude'>
          {data.strapiRoute.Route_path[order].point.altitude} m.n.m.
        </span>
      </div>
    );
  if (!start && routeStatus === 'checkpoint') {
    return (
      <div className='tourguide_current_point'>
        <span className='tourguide_label'>
          ste tu
        </span>
        <h2>
          {data.strapiRoute.Route_path[nextPoint].point.title}
        </h2>
        <span className='tourguide_altitude'>
          {data.strapiRoute.Route_path[nextPoint].point.altitude} m.n.m.
        </span>
      </div>
    );
  }
}
const Nexpoint = ({ start, routeStatus, data, order, nextPoint, maxPoints }) => {

  if (nextPoint <= maxPoints) {

    if (routeStatus === 'checkpoint') {
      let colorOrder = nextPoint + 2;
      let titleOrder = nextPoint + 1;
      if (colorOrder <= maxPoints) {
        colorOrder = nextPoint + 1;
      }
      if (titleOrder >= maxPoints) {
        titleOrder = maxPoints
      }
      return (
        <div className='tourguide_next'>
          <div>
            <span className='tourguide_label'>
              nasleduje {colorOrder} / {maxPoints + 1}
            </span>
            <h2>
              {data.strapiRoute.Route_path[titleOrder].point.title}
            </h2>
            <span className='tourguide_altitude'>
              {data.strapiRoute.Route_path[titleOrder].point.altitude} m.n.m.
            </span>
          </div>
          <div className='tourguide_color'>
            <span className={data.strapiRoute.Route_path[nextPoint].farba}>
              {data.strapiRoute.Route_path[nextPoint].time}
            </span>
          </div>
        </div>
      );
    }
    else {

      let colorOrder = nextPoint + 1;
      return (
        <div className='tourguide_next'>
          <div>

            <span className='tourguide_label'>
              nasleduje {colorOrder} / {maxPoints + 1}
            </span>
            <h2>
              {data.strapiRoute.Route_path[nextPoint].point.title}
            </h2>
            <span className='tourguide_altitude'>
              {data.strapiRoute.Route_path[nextPoint].point.altitude} m.n.m.
            </span>
          </div>
          <div className='tourguide_color'>
            <span className={data.strapiRoute.Route_path[order].farba}>
              {data.strapiRoute.Route_path[order].time}
            </span>
          </div>
        </div>
      );
    }
  }
}

const StartButton = ({ routeStatus, routeStarted, reset, routeRunning }) => {
  switch (routeStatus) {
    case 'onstart':
      return (
        <button onClick={routeStarted} className='tourguide_btn tourguide_btn--main'>
          Spustiť
        </button>
      );
    case 'running':
      return (
        <button onClick={routeRunning} className='tourguide_btn tourguide_btn--ghost'>
          Som tu
        </button>
      );
    case 'checkpoint':
      return (
        <button onClick={reset} className='tourguide_btn tourguide_btn--main'>
          Idem ďalej
        </button>
      );
  }
}
const BackImage = ({ routeStatus, data, order }) => {
  switch (routeStatus) {
    case 'onstart':
      return (
        <div className='tourguide_background_wrap'>
          <img className="tourguide_background" src={data.strapiRoute.Route_path[order].point.image.url} alt={data.strapiRoute.Route_path[order].point.image.alternativeText} />
        </div>
      );
    case 'running':
      return (
        <div className='tourguide_background_wrap'>
          <img className="tourguide_background tourguide_background--next" src={data.strapiRoute.Route_path[order + 1].point.image.url} alt={data.strapiRoute.Route_path[order].point.image.alternativeText} />
        </div>
      );
    case 'checkpoint':
      return (
        <div className='tourguide_background_wrap'>
          <img className="tourguide_background" src={data.strapiRoute.Route_path[order + 1].point.image.url} alt={data.strapiRoute.Route_path[order].point.image.alternativeText} />
        </div>
      );
  }
}