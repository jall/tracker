import {accumulate} from "./helpers"

test.skip("accumulate should gather invocations into the final promise", (done) => {
  const say = accumulate((name: string) => {
    console.log(name)
    return name + " processed"
  }, 1000)

  const promises: Array<Promise<unknown>> = []

  setTimeout(() => {
    promises.push(
      say("1.1").then((invocations) =>
        expect(invocations).toEqual(["1.1 processed"]),
      ),
    )
  }, 10)

  setTimeout(() => say("2.1"), 1120)
  setTimeout(() => say("2.2"), 1900)
  setTimeout(() => {
    promises.push(
      say("2.3").then((invocations) =>
        expect(invocations).toEqual([
          "2.1 processed",
          "2.2 processed",
          "2.3 processed",
        ]),
      ),
    )
  }, 1995)

  setTimeout(() => {
    promises.push(
      say("3.1").then((invocations) =>
        expect(invocations).toEqual(["3.1 processed"]),
      ),
    )
  }, 3005)

  Promise.all(promises).then(done)
})
