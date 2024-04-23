import { render } from 'preact'
import { App } from './app.tsx'
import './stylesheets/index.css'
import './stylesheets/projecttransition.css'
import './stylesheets/swipe.css'
import { setStyles } from './setstyles.ts'

setStyles();

render(<App />, document.getElementById('app')!)
