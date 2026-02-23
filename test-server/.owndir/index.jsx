import React, { useContext, useEffect, useState, useReducer, useRef } from 'react';
import "./style.scss"

import { runTests } from "./globals.js";
// import "./test/fsNode.js";

/*
  let's think about what we want our test rig to look like

  test code is NOT embedded with test data
    consider testing routes
    - I need an owndir that sets up a route
    - I need a test that _validates_ the route
        should this test live inside the node that it's validating?

*/




test("test framework validation", async () => {
  is(true, "boolean assertion pass")
  isEq(1, 1, "equality assertion pass")
  await new Promise(resolve => setTimeout(resolve, 2000));
  is(false, "boolean assertion fail")
  isEq(1, 2, "equality assertion fail")
})

test("test framework validation 2", async () => {
  is(true, "boolean assertion pass")
  await new Promise(resolve => setTimeout(resolve, 2000));
  isEq(1, 1, "equality assertion pass")
})

function cStr (cObj) {
  return Object.keys(cObj).filter(k => cObj[k]).join(' ');
}

export default {

  frame: function () {
    const dir = this.directory;
    const [tests, setTests] = useState([])

    useEffect(() => {
      runTests(setTests);
    }, [])

    useEffect(() => {
      console.log({tests})
    })

    return <main>
      <h1>OwnDir Test Suite</h1>

      {tests.map(({label, phase, results, errors}, ti) => {
        const failed = errors?.length > 0;

        return (
          <article
            key={`${ti} - ${label}`}
            className={cStr({test: true, 
                             [phase]: true,  
                             passed: !failed && phase == 'done', 
                             failed
                           })}
          >
            <header>
              <strong>{label}</strong>
              {phase == 'running'
                ? <progress /> 
                : null}
            </header>      
            <div className="results">
              {results.map(({pass, exception, message, test, values}, ri) => (
                <div className={cStr({ result: true, passed: pass, failed: !pass, exception: !!exception })} 
                     key={`${ti}.${ri} - ${label}`}
                     title={message}
                ></div>
                ))}
            </div>
            
          </article>)
      })}
    </main>
  },

}
