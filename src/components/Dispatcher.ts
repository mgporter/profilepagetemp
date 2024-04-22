import { ProjectType } from "./PROJECTS";

export type DispatcherEvent = keyof DispatcherMap;

export interface DispatcherMap {
  projectTypeSelected: ProjectType[];
  selectFeatured: null;
  enableProjectControls: boolean;
  showProjectIcons: boolean;
}

// eslint-disable-next-line
type DispatcherEventObj = Record<DispatcherEvent, ((arg: any) => void)[]>;

class Dispatcher {

  private Events: DispatcherEventObj = {
    projectTypeSelected: [],
    selectFeatured: [],
    enableProjectControls: [],
    showProjectIcons: [],
  }
  
  constructor() {}

  subscribe<K extends keyof DispatcherMap>(event: K, callback: (arg: DispatcherMap[K]) => void) {
    this.Events[event].push(callback);
    return () => {this.Events[event].splice(this.Events[event].indexOf(callback), 1)};
  }

  dispatch<K extends keyof DispatcherMap>(event: K, data: DispatcherMap[K]) {
    console.log("DISPATCHER: " + event);
    this.Events[event].forEach(cb => cb(data));
  }

}

const dispatcher = new Dispatcher();

export { dispatcher };