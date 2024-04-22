import { VNode } from "preact";

type globImport = Record<string, {default: string}>;

const fullImages = import.meta.glob("/src/screenshots/webp_full/*", {eager: true}) as globImport;
const thumbnailImages = import.meta.glob("/src/screenshots/webp_thumbnails/*", {eager: true}) as globImport;

const images: Record<string, string> = {};

// convert filepaths from "/src/screenshots/webp_full/myimage.webp" to "myimage"
// Use these new paths are keys to each image path.
for (const path in fullImages) {
  const name = path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf("."));
  images[name] = fullImages[path].default;
}

for (const path in thumbnailImages) {
  const name = path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf("."));
  images[name] = thumbnailImages[path].default;
}



// const inlinePictureBig = "border-2 border-slate-400 w-[90%] self-center";

export type Dimensions_2d = [number, number];

const STANDARD_1080P: Dimensions_2d = [1920, 1080];

export type ProjectType = "Javascript" 
  | "TypeScript" 
  | "React"
  | "Preact" 
  | "Java" 
  | "C++" 
  | "WebAssembly" 
  | "WebSockets" 
  | "Three.js" 
  | "Database" 
  | "Open-Source Contributor"
  | "Swing"
  | "Beginner";

export type ProjectStyle = "emphasized" | "faded" | "default";

export interface Project {
  name: string;
  id: number;
  style: ProjectStyle;
  types: ProjectType[];
  featured: boolean;
  imageThumbnailSrc: string;
  imageSrc: string;
  imageDimensions: Dimensions_2d;
  livePreviewUrl: string | null;
  sourceUrl: string;
  heading: string;
  description: VNode;
}

const projects: Project[] = [
  // {
  //   name: "About me",
  //   id: Number.MAX_SAFE_INTEGER,
  //   style: "default",
  //   types: [],
  //   featured: false,
  //   imageThumbnailSrc: mgporter_image,
  //   imageSrc: mgporter_image,
  //   livePreviewUrl: "https://mgporter.github.io/",
  //   sourceUrl: "https://github.com/mgporter/",
  //   heading: "About me",
  //   description: 
  //     <>
  //       <p>Allows users to upload a picture, process it, and save the results back to disk.</p>
  //       <p>Utilizes C++ code compiled to WebAssembly with emscripten to accelerate image processing (it only does a gaussian blur right now though).</p>
  //       <p>Data is transferred using Javascript's ArrayBuffers (or pointers to ArrayBuffers). The program manages the WebAssembly memory manually (that is, without using emscripten's 'glue code') in order to keep the wasm code size small (~1,299 bytes).</p>
  //       <p>Performance of calculation time and overhead time is measured on each run. Even with its extra overhead, the WebAssembly module easily beats the Javascript implementation by a factor of 10.</p>
  //       <p>Javascript's Web Workers API is used in order to keep the thread responsive during calculations.</p>
  //     </>,
  // },
  {
    name: "Wasm Image Processor",
    id: 160,
    style: "default",
    types: ["TypeScript", "React", "WebAssembly", "C++"],
    featured: true,
    imageThumbnailSrc: images["image_processor_thumbnail"],
    imageSrc: images["image_processor"],
    imageDimensions: [1874, 1080],
    livePreviewUrl: "https://image-processor-xi.vercel.app/",
    sourceUrl: "https://github.com/mgporter/image_processor",
    heading: "An example of client-side image processing comparing the performance of WebAssembly (from C++) against Javascript.",
    description: 
      <>
        <p>Allows users to upload a picture, process it, and save the results back to disk.</p>
        <p>Utilizes C++ code compiled to WebAssembly with emscripten to accelerate image processing (it only does a gaussian blur right now though).</p>
        <p>Data is transferred using Javascript's ArrayBuffers (or pointers to ArrayBuffers). The program manages the WebAssembly memory manually (that is, without using emscripten's 'glue code') in order to keep the wasm code size small (~1,299 bytes).</p>
        <p>Performance of calculation time and overhead time is measured on each run. Even with its extra overhead, the WebAssembly module easily beats the Javascript implementation by a factor of 10.</p>
        <p>Javascript's Web Workers API is used in order to keep the thread responsive during calculations.</p>
      </>,
  },
  {
    name: "Blubble's World Demo",
    id: 150,
    style: "default",
    types: ["TypeScript", "React", "Three.js"],
    featured: true,
    imageThumbnailSrc: images["blubbles_world_thumbnail"],
    imageSrc: images["blubbles_world"],
    imageDimensions: STANDARD_1080P,
    livePreviewUrl: "https://blubbleworld-01-client.vercel.app/",
    sourceUrl: "https://github.com/mgporter/blubbleworld-01-client",
    heading: "Build a town and grow your population in this 3d app. Just a demo currently, but you can generate landscapes and place buildings.",
    description:
      <>
        <p>Built on React and Three.js with typescript.</p>
        <p>Object-oriented design: streamlined selection and building placement system allows easy editing and changing of building properties. For example, building max height, what part of the landscape it can be placed at, etc can all be changed with just one variable.</p>
        <p>Uses Three.js InstancedMesh class to create landscapes that render efficiently and quickly, which is combined with custom objects to hold the state (selected / hovered / etc..) of each instance.</p>
        <p>Converts mouse coordinates to 3d world coordinates and vice versa in order to properly align elements between the canvas layer and HTML overlay (for example, the marker system and selection system).</p>
      </>,
  },
  {
    name: "Battleship! Online (PvP)",
    id: 140,
    style: "default",
    types: ["Javascript", "Three.js", "React", "Java", "Database", "WebSockets"],
    featured: true,
    imageThumbnailSrc: images["battleship_online_thumbnail"],
    imageSrc: images["battleship_online"],
    imageDimensions: STANDARD_1080P,
    livePreviewUrl: "https://mgporter.github.io/top10b_battleship_online_client/",
    sourceUrl: "https://github.com/mgporter/top10b_battleship_online_client",
    heading: "Create a game room and play against other players in this Battleship app backed by a Java Spring Boot backend.",
    description:
      <>
        <p>Uses React.js with websockets on the frontend, with Java Spring Boot and MongoDB on the backend.</p>
        <p>Players are provided with constant feedback on their opponent and his/her actions, improving the UI/UX experience.</p>
        <p>The frontend utilizes most of the hooks in React, including useCallback and useMemo for efficiency. I also created custom hooks and a simple event emitter to streamline the code.</p>
        <p>Games can be saved and loaded, as long as at least one player is in the game room. On the backend, the server efficiently stores only the minimum game state needed to recreate the game.</p>
        <p>The server performs all checks and calculations within the game independently, rather than trusting the client. Data sent to the player is only what the player is allowed to see at any particular moment (we don't just send everything to the player and let the client work it out).</p>
        <p>Access the server repository here: https://github.com/mgporter/top10b_battleship_online</p>
      </>,
  },
  {
    name: "Audiveris",
    id: 160,
    style: "default",
    types: ["Java", "Swing", "Open-Source Contributor"],
    featured: false,
    imageThumbnailSrc: images["audiveris"],
    imageSrc: images["audiveris"],
    imageDimensions: [567, 260],
    livePreviewUrl: null,
    sourceUrl: "https://github.com/Audiveris/audiveris",
    heading: "Written by Hervé Bitteur, Audiveris converts images of sheet music to MusicXML format.",
    description: 
      <>
        <p>My contributions include UI and usability updates. Audiveris is an application long in development and now consists of ~400,000 lines, so it presents numerous challenges to contributors.</p>
        <p>I worked on UI elements related to binarization (conversion of images to black and white). My binarization UI elements tie into the processing engine to allow quick editing of binarization settings and real-time updated views.</p>
      </>,
  },
  {
    name: "Wordle Wrangler",
    id: 130,
    style: "default",
    types: ["Java"],
    featured: false,
    imageThumbnailSrc: images["wordle_wrangler_thumbnail"],
    imageSrc: images["wordle_wrangler"],
    imageDimensions: [1376, 675],
    livePreviewUrl: null,
    sourceUrl: "https://github.com/mgporter/java03_wordle-wrangler",
    heading: "My mom likes to play Wordle, so I created a program to help me beat her at it ;)",
    description:
      <>
        <p>Wordle Wrangler works by first inputting the target word, and then inputting the result, using CAPITAL LETTERS for green, lowercase letters for yellow, and ??? for gray.</p>
        <p>See it in action above!</p>
        <p>Under the hood, the wrangler uses Iterator and Stream classes to efficiently process and filter the &gt;69,000 words in the dictionary.</p>
        <p>It also handles fringe cases, such as when double letters appear and one is valid but the other is not.</p>
        <p>Uses colorized console text and instructions for guided input, and provides helpful warning messages to teach the user to provide correct input.</p>
      </>,
  },
  {
    name: "Moana Memory Card Game",
    id: 120,
    style: "default",
    types: ["Javascript", "React"],
    featured: false,
    imageThumbnailSrc: images["moana_memory_cards_thumbnail"],
    imageSrc: images["moana_memory_cards"],
    imageDimensions: [1883, 1059],
    livePreviewUrl: "https://top11-memory-cards.vercel.app/",
    sourceUrl: "https://github.com/mgporter/top11_memory-cards",
    heading: "Click on each character once and only once, but beware: the cards shuffle themselves after each click!",
    description:
      <>
        <p>My first app using the React library!</p>
        <p>Uses React's useState and useEffect hooks to manage rendering.</p>
        <p>Animations give user feedback based on if cards are selected correctly or incorrectly, and also when they are shuffled.</p>
        <p>The shuffling animation uses Javascript to calculate a translate value for each card. It works no matter the screen size, zoom level, number of cards displayed, or the arrangement of the cards on the screen.</p>
        <p>Uses asynchronous functions and JS Promises to fetch data from an API and update state when ready.</p>
        <p>Automatically sizes characters' names to fit within the space on the card. You can test this by adding new random cards to the set. Since the names are not known ahead of time, the algorithm scales them down if they would have overflowed the container.</p>
      </>,
  },
  {
    name: "Knights' Travails",
    id: 110,
    style: "default",
    types: ["Java"],
    featured: false,
    imageThumbnailSrc: images["knights_travails_thumbnail"],
    imageSrc: images["knights_travails"],
    imageDimensions: [1107, 651],
    livePreviewUrl: null,
    sourceUrl: "https://github.com/mgporter/java01_knights-travails",
    heading: "An algorithm to find the shortest path for a chess knight to move between any two squares.",
    description:
      <>
        <p>To use Knights Travails, we call the program with four arguments: the startingRow, the startingColumn, the endingRow, and the endingColumn.</p>
        <p>This program uses a breadth-first search algorithm to find the fewest number of jumps a knight would take from the start square to the ending square</p>
        <p>Throws helpful errors to the user when given incorrect input. Notice in the gif how the user gets an error when an invalid square is inputted.</p>
        <p>Uses basic java.util data structures.</p>
      </>,
  },
  {
    name: "Battleship! Single-player",
    id: 100,
    style: "default",
    types: ["Javascript", "Three.js"],
    featured: false,
    imageThumbnailSrc: images["battleship_singleplayer_thumbnail"],
    imageSrc: images["battleship_singleplayer"],
    imageDimensions: STANDARD_1080P,
    livePreviewUrl: "https://mgporter.github.io/top10_battleship/",
    sourceUrl: "https://github.com/mgporter/top10_battleship",
    heading: "The classic game of Battleship, reborn in a 3d javascript environment!",
    description:
      <>
        <p>Players face off against a hand-coded computer opponent. The opponent's algorithm searches for your ships and picks them off one by one when it finds them.</p>
        <p>Uses a WebGL canvas to display 3d models of ships within the gamespace.</p>
        <p>Uses a 3d Three.js canvas (for the 3d models) superimposed on a CSS div (for user interaction). The two are 'locked' together with Javascript, even with transformations and resize events.</p>
        <p>UI/UX design: ships capsize when they are sunk, elements flash to show they require user interaction, and dom menus animate in and out of the gamespace.</p>
        <p>Models are loaded asyncronously using Javascript promises, and a loading bar at the beginning gives progress indication.</p>
        <p>Use of Jest to test automate testing.</p>
        <p>Strong use of Object-Oriented Programming principles, e.g. with the gameboard, the ships, and the players.</p>
        <p>The game stores play history in a collection of 'battle stats' that players can view.</p>
        <p>Includes gamespeed options to speed up or slow down the progression of the game.</p>
      </>,
  },
  {
    name: "Profile Page Website",
    id: 160,
    style: "default",
    types: ["TypeScript", "Preact"],
    featured: false,
    imageThumbnailSrc: images["profile_website_thumbnail"],
    imageSrc: images["profile_website"],
    imageDimensions: [1873, 1054],
    livePreviewUrl: "https://image-processor-xi.vercel.app/",
    sourceUrl: "https://github.com/mgporter/image_processor",
    heading: "The website you are viewing now. A lightweight portfolio showcase made with Preact, Typescript, and GRADIENTS ;) .",
    description: 
      <>
        <p>This is a simple website for displaying some of my programming work. It is meant to be lightweight and responsive. Asides from using Preact to cut down on overhead code, it also contains simple optimizations to improve the user experience on slower connections. For example, images (and there are a lot of them) are given a placeholder while they are loading.</p>
        <p>I couldn't help but include one snazzy effect when the user opens a project. The page 'bubbles' out and is replaced by the project description. This effect actually has quite a few moving parts, since it is not usually possible to clip (or delete) a portion of an element starting from the inside. See if you can figure out how it's done! As far as hooks, this effect does involve the relatively little-used useLayoutEffect hook to get accurate measurements of dom elements (complicated greatly by the presence/absence of the scrollbar!).</p>
      </>,
  },
  {
    name: "Visual Linked List",
    id: 90,
    style: "default",
    types: ["Javascript"],
    featured: false,
    imageThumbnailSrc: images["linked_list_thumbnail"],
    imageSrc: images["linked_list"],
    imageDimensions: STANDARD_1080P,
    livePreviewUrl: "https://mgporter.github.io/top09_linkedlist/",
    sourceUrl: "https://github.com/mgporter/top09_linkedlist",
    heading: "A visualization of a linked list with connected, draggable nodes, built on an actual linked list in Javascript.",
    description:
      <>
        <p>Creates a linked list using javascript pass-by-reference instead of pointers (as in other languages). Objects are chained together by setting them to the previous object's .next property.</p>
        <p>Nodes are absolutely positioned on top of a canvas element based on the location of adjacent nodes. New nodes are always clamped to be inside this element, even when resizing the window.</p>
        <p>Nodes are connected with a bezier curve drawn on the canvas. The start/end points are always in the center of the .value/.next part of the node, respectively. Dragging nodes automatically animates the connections so that they stay connected. Applies dynamic scaling to canvas to keep content looking sharp, even when highly zoomed in.</p>
        <p>The linked list uses custom error messages on invalid input, which are caught by the dom modules in 'try' blocks and displayed to the user.</p>
        <p>The DOM gives the user access to the 12 functions of the linked list by calling those functions directly--there are no intermediary objects. The DOM is updated with logic that decides when to show/clear messages, when to show/clear controls, when to highlight nodes, and so on.</p>
      </>,
  },
  {
    name: "Weather App",
    id: 80,
    style: "default",
    types: ["Javascript"],
    featured: false,
    imageThumbnailSrc: images["weather_app_thumbnail"],
    imageSrc: images["weather_app"],
    imageDimensions: STANDARD_1080P,
    livePreviewUrl: "https://mgporter.github.io/top08_weather-app/",
    sourceUrl: "https://github.com/mgporter/top08_weather-app",
    heading: "Frontend for a weather API that features a 3-day day-by-day report as well as hour-by-hour forecasts.",
    description:
      <>
        <p>Uses asynchronous functions to retreive data from an API. Fires off custom events to inform the DOM module to update the view based on program state (data loading, data retrieval, change of display units, etc).</p>
        <p>Implements autocomplete functionality for locations based on API queries.</p>
        <p>Custom built slider displays hourly weather data. Elements in the slider fade in and out by finding the relative position of each element (the 'hour-box'), and calculating its opacity based on its distance from the horizontal center of the screen.</p>
        <p>The slider uses the requestAnimationFrame method to create a deceleration effect after being dragged by the mouse by saving a value for the velocity of the slider at mouse release. It then continually adds that value to the slider's position while also decreasing it slowly.</p>
        <p>The slider also moves automatically when the user clicks on a day. Because of the opacity calculations, this movement cannot be done with CSS transitions. Instead, it is implemented manually using requestAnimationFrame and a parametric equation to create an ease-in-ease-out movement effect to the desired coordinates.</p>
      </>,
  },
  {
    name: "Todo List App",
    id: 70,
    style: "default",
    types: ["Javascript"],
    featured: false,
    imageThumbnailSrc: images["todo_list_app_thumbnail"],
    imageSrc: images["todo_list_app"],
    imageDimensions: STANDARD_1080P,
    livePreviewUrl: "https://mgporter.github.io/top07_todo-list/",
    sourceUrl: "https://github.com/mgporter/top07_todo-list",
    heading: "A todo list app that allows uesrs to organize and drag-and-drop items, with automatic saving to LocalStorage.",
    description:
      <>
        <p>All data is saved to localStorage and retrieved on startup. All changes are saved when they are made (rather than resaving all lists).</p>
        <p>The lastModified timestamp for a list is automatically updated on any change to the list or its items.</p>
        <p>Session, list, and items objects are built from factory-functions.</p>
        <p>Uses SOLID programming concepts with a modularized degin (separate DOM controller, storage interface, etc).</p>
        <p>Uses custom events to trigger DOM updates, i.e., updating timestamps and moving most recently modified lists to the top of the nav bar.</p>
        <p>Efficient event listeners: event listeners placed on parent container can use e.target properties to modify relavent child elements.</p>
        <p>Item order can be rearranged through drag and drop with custom dropzones that appear on dragstart. Item order is saved with the list.</p>
      </>,
  },
  {
    name: "Restaurant Page",
    id: 60,
    style: "default",
    types: ["Javascript"],
    featured: false,
    imageThumbnailSrc: images["restaurant_page_thumbnail"],
    imageSrc: images["restaurant_page"],
    imageDimensions: [1875, 1055],
    livePreviewUrl: "https://mgporter.github.io/top06_restaurant-page/",
    sourceUrl: "https://github.com/mgporter/top06_restaurant-page",
    heading: "A tabbed navigation site with a spiffy background that uses webpack to bundle all dependencies and assets.",
    description:
      <>
        <p>Uses Webpack to bundle project dependencies.</p>
        <p>Pages are created dynamically with Javascript, rather than hardcoded into the HTML.</p>
        <p>Uses imports and exports of assets and data for images, stylesheets, and csv data.</p>
        <p>Moving stars background created by generating svg stars with random size and position onto a div. The div is then animated across the screen with random speed and starting position. Only the divs move, not the stars. This creates a nice parallax effect that is more efficient than animating each star individually.</p>
      </>,
  },
  {
    name: "Ultimate Tic-Tac-Toe",
    id: 50,
    style: "default",
    types: ["Javascript", "Beginner"],
    featured: false,
    imageThumbnailSrc: images["ultimate_tic_tac_toe_thumbnail"],
    imageSrc: images["ultimate_tic_tac_toe"],
    imageDimensions: STANDARD_1080P,
    livePreviewUrl: "https://mgporter.github.io/top05_tic-tac-toe/",
    sourceUrl: "https://github.com/mgporter/top05_tic-tac-toe",
    heading: "A tic-tac-toe game that allows for custom grid sizes, number of players, player decals, and even win conditions.",
    description:
      <>
        <p>Customizable number of players, from 2-8. Turn control will automatically switch between each player.</p>
        <p>Allows customizable grid size, such as 5x5 or even non-square grids like 3x6.</p>
        <p>Can customize win conditions (how many items in a row that you need to win).</p>
        <p>Because grid size and win conditions are dynamic, the algorithm loops over each cell in the grid, and if a surrounding cell is the same as the current cell, the alorithm continues to search in that same direction to see how many of the same cells are in a row. For efficiency, the algorithm continues to the next cell (without doing all the calculations) if a win is not possible from the current cell.</p>
        <p>Uses Javascript module pattern to create separate objects for the cells, the board controller, the dom controller, and so on.</p>
      </>,
  },
  {
    name: "Bookshelf App",
    id: 40,
    style: "default",
    types: ["Javascript", "Beginner"],
    featured: false,
    imageThumbnailSrc: images["bookshelf_app_thumbnail"],
    imageSrc: images["bookshelf_app"],
    imageDimensions: [1900, 1069],
    livePreviewUrl: "https://mgporter.github.io/top04_library/",
    sourceUrl: "https://github.com/mgporter/top04_library",
    heading: "A skeuomorphic virtual bookshelf that displays virtual book entries and information like books on a shelf.",
    description:
      <>
        <p>Uses Javascript constructor functions to create and store library information as book objects.</p>
        <p>CSS background filter, blend, and gradient styling are used to give a realistic bookshelf look complete with spotlights.</p>
        <p>Uses HTML forms with Javascript handling.</p>
        <p>Custom drop-down menus are created with Javascript that allow manipulation of the book objects.</p>
      </>,
  },
  {
    name: "Simple Calculator",
    id: 30,
    style: "default",
    types: ["Javascript", "Beginner"],
    featured: false,
    imageThumbnailSrc: images["simple_calculator_thumbnail"],
    imageSrc: images["simple_calculator"],
    imageDimensions: STANDARD_1080P,
    livePreviewUrl: "https://mgporter.github.io/top03_calculator/",
    sourceUrl: "https://github.com/mgporter/top03_calculator",
    heading: "A simple Javascript calculator that actually does decimal numbers correctly. Also does repeated operations.",
    description:
      <>
        <p>Creates a calculator class with all relevant calculator functions.</p>
        <p>Add, subtract, multiply, divide, and use exponents on numbers up to 16 digits. Returns error if number is out of range.</p>
        <p>Some buttons have different functions based on calculator state, i.e., the equals button executes a previously entered operation, but can also repeat that operation when pressed multiple times.</p>
        <p>Uses the library Big.js to accurately calculate decimal numbers.</p>
      </>,
  },
  {
    name: "Etch-a-Sketch",
    id: 20,
    style: "default",
    types: ["Javascript", "Beginner"],
    featured: false,
    imageThumbnailSrc: images["etch_a_sketch_thumbnail"],
    imageSrc: images["etch_a_sketch"],
    imageDimensions: STANDARD_1080P,
    livePreviewUrl: "https://mgporter.github.io/top02_etch-a-sketch/",
    sourceUrl: "https://github.com/mgporter/top02_etch-a-sketch",
    heading: "Select a color and paint with it by moving the mouse over a grid of custom size. Supports blending of colors.",
    description:
      <>
        <p>Uses CSS grid to create a custom-sized drawing grid.</p>
        <p>Blends selected colors with existing colors by parsing CSS color values with Regex and adding them.</p>
        <p>Event listeners are created dynamically based on user input.</p>
      </>,
  },
  {
    name: "Rock-Paper-Scissors",
    id: 10,
    style: "default",
    types: ["Javascript", "Beginner"],
    featured: false,
    imageThumbnailSrc: images["rock_paper_scissors_thumbnail"],
    imageSrc: images["rock_paper_scissors"],
    imageDimensions: STANDARD_1080P,
    livePreviewUrl: "https://mgporter.github.io/top01_rock-paper-scissors/",
    sourceUrl: "https://github.com/mgporter/top01_rock-paper-scissors",
    heading: "Play an animated game of Rock-paper-scissors against a computer opponent.",
    description:
      <>
        <p>First Javascript project!</p>
        <p>Uses CSS animations and keyframes to animate game states.</p>
        <p>Uses Javascript event listeners to receive user input.</p>
        <p>DOM manipulating with Javascript.</p>
        <p>Demonstrates basic program flow.</p>
      </>,
  }

]

// Set everybody's id to the index so we can retreive the correct project later
projects.forEach((x, i) => {
  x.id = i;
})

export { projects };