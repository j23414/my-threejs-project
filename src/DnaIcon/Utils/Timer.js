// Threejs Journey Tutorial
import EventEmitter from "./EventEmitter.js"

export default class Timer extends EventEmitter
{
  constructor()
  {
    super()

    // Setup
    this.start = Date.now()
    this.currentTime = this.start
    this.elapsedTime = 0
    this.delta=16

    window.requestAnimationFrame(() =>
    {
      this.tick()
    })
  }

  tick()
  {
    const currentTime = Date.now()
    this.delta = currentTime - this.current
    this.current = currentTime
    this.elapsedTime = this.current - this.start

    this.trigger('tick')

    window.requestAnimationFrame(() =>
    {
      this.tick()
    })
  }
}