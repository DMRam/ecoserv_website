// import React, { useState, useEffect, useMemo } from 'react'
// import useMeasure from 'react-use-measure'
// import { useTransition, a } from '@react-spring/web'
// import shuffle from 'lodash.shuffle'

// import useMedia from './useMedia'
// // import data from './data'

// import styles from './styles.module.css'
// import { EcoserviceItem } from './EcoserviceItem'

// const Masonry = () => {

//     const images_nettoyage = [
//         {
//             url: "https://kaizenaire.com/wp-content/uploads/2023/12/Commercial-Cleaning-Services-in-Singapore-Keeping-Your-Business-Sparkling-Clean-1024x585.jpg",
//             title: "Comercial",
//             height: 500,
//             width: "40%",
//         },
//         {
//             url: "https://media.istockphoto.com/id/1031043754/photo/new-modern-living-room-with-kitchen-new-home-interior-photography-wooden-floor.jpg?s=612x612&w=0&k=20&c=CmnYvn3hXsNGJ5oOHyV76RmWlDdlljjrcIST_0ubKOw=",
//             title: "Résidentielle",
//             height: 500,
//             width: "20%",
//         },
//         {
//             url: "https://thinkdifferentnetwork.com/wp-content/uploads/2019/03/Chalet-style-in-the-interior-of-apartments-and-houses3.jpg",
//             title: "Chalet",
//             height: 500,
//             width: "40%",
//         },
//         {
//             url: "https://lirp.cdn-website.com/a2cc572e/dms3rep/multi/opt/man-cleaning-walls-floor-with-high-pressure-640w.jpeg",
//             title: "Patio",
//             height: 500,
//             width: "100%",
//         },
//     ];


//     // Hook1: Tie media queries to the number of columns
//     const columns = useMedia(['(min-width: 1500px)', '(min-width: 1000px)', '(min-width: 600px)'], [5, 4, 3], 2)
//     // Hook2: Measure the width of the container element
//     const [ref, { width }] = useMeasure()
//     // Hook3: Hold items
//     const [items, set] = useState(data)
//     // Hook4: shuffle data every 2 seconds
//     useEffect(() => {
//         const t = setInterval(() => set(shuffle), 5000)
//         return () => clearInterval(t)
//     }, [])
//     // Hook5: Form a grid of stacked items using width & columns we got from hooks 1 & 2
//     const [heights, gridItems] = useMemo(() => {
//         let heights = new Array(columns).fill(0) // Each column gets a height starting with zero
//         let gridItems = images_nettoyage.map((child, i) => {
//             const column = heights.indexOf(Math.min(...heights)) // Basic masonry-grid placing, puts tile into the smallest column using Math.min
//             const x = (width / columns) * column // x = container width / number of columns * column index,
//             const y = (heights[column] += child.height / 2) - child.height / 2 // y = it's just the height of the current column
//             return { ...child, x, y, width: width / columns, height: child.height / 2 }
//         })
//         return [heights, gridItems]
//     }, [columns, items, width])
//     // Hook6: Turn the static grid values into animated transitions, any addition, removal or change will be animated
//     const transitions = useTransition(gridItems, {
//         key: (item: { css: string; height: number }) => item.css,
//         from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
//         enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
//         update: ({ x, y, width, height }) => ({ x, y, width, height }),
//         leave: { height: 0, opacity: 0 },
//         config: { mass: 5, tension: 200, friction: 100 },
//         trail: 25,
//     })
//     // Render the grid
//     return (
//         <div ref={ref} className={styles.list} style={{ height: Math.max(...heights) }}>
//             {transitions((style, item) => (
//                 <a.div style={style}>
//                     <div style={{ backgroundImage: `url(${item.url}?auto=compress&dpr=2&h=500&w=500)` }} />
//                     {/* <h3>{item.height}</h3> */}
//                     {/* <EcoserviceItem imageSrc={item.url} /> */}
//                 </a.div>
//             ))}
//         </div>
//     )
// }

// export const EcoserviceSection = () => {
//     return <Masonry />
// }

import React from 'react'

export const EcoserviceSection = () => {
  return (
    <div>EcoserviceSection</div>
  )
}

