import { createContext } from 'react'

export const AnimationContext = createContext();

export const initialState = {
  dots: [],
  dotVectors: [],
  morphVectors: [],
  logoVectors: [],
  currentDot: 0,
  count: 0,
  drawing: true,
  animating: false,
  lerpSpeed: 0.11,
  strokeWeight: 0.1,
  hasFill: false,
  hasBackground: false
};

export function reducer(state, action) {
  switch (action.type) {
    case "add dot":
      return {
        ...state,
        dots: [...state.dots, ...[action.payload]]
      }
    case "increment":
      return {
        ...state,
        count: state.count + 1
      }
    case "toggle drawing":
      return {
        ...state,
        drawing: !state.drawing
      }
    case "toggle fill":
      return {
        ...state,
        hasFill: !state.hasFill
      }
    case "toggle background":
      return {
        ...state,
        hasBackground: !state.hasBackground
      }
    case "set lerp speed":
      return {
        ...state,
        lerpSpeed: action.payload
      }
    case "set stroke weight":
      return {
        ...state,
        strokeWeight: action.payload
      }
    case "set current":
      return {
        ...state,
        currentDot: action.payload
      }
    case "toggle animating":
      return {
        ...state,
        animating: !state.animating
      }
    case "set morph vectors":
      return {
        ...state,
        morphVectors: [...action.payload]
      }
    case "set dot vectors":
      return {
        ...state,
        dotVectors: [...action.payload]
      }
    default:
      return state;
  }
}
