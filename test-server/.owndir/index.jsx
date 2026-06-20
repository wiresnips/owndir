import React, { useContext, useEffect, useState, useReducer, useRef } from 'react';
import "./style.scss"
import "@mdi/font/css/materialdesignicons.min.css"

import { runTests } from "./globals.js";
import * as test_fsNode from "./test/fsNode.js";
import * as test_cssLoading from "./test/css-loading.js";

/*
  let's think about what we want our test rig to look like

  test code is NOT embedded with test data
    consider testing routes
    - I need an owndir that sets up a route
    - I need a test that _validates_ the route
        should this test live inside the node that it's validating?
*/



/*
test("test framework validation", async () => {
  is(true, "boolean assertion pass")
  isEq(1, 1, "equality assertion pass")
  // await new Promise(resolve => setTimeout(resolve, 2000));
  is(false, "boolean assertion fail")
  isEq(1, 2, "equality assertion fail")
})

test("test framework validation 2", async () => {
  is(true, "boolean assertion pass")
  // await new Promise(resolve => setTimeout(resolve, 2000));
  isEq(1, 1, "equality assertion pass")
})
*/

function cStr (cObj) {
  return Object.keys(cObj).filter(k => cObj[k]).join(' ');
}

export default {

  frame: function () {
    const [tests, setTests] = useState([]);

    useEffect(() => {
      test_cssLoading.Tests(this.directory);
      test_fsNode.Tests(this.directory);
      runTests(setTests);
    }, [])

    useEffect(() => {
      console.log({tests})
    })


    const [testsExpanded, toggleTestExpanded] = useReducer(
      (testsExpanded, testLabel) => ({
          ...testsExpanded, 
          [testLabel]: !testsExpanded[testLabel]
        }), {})


    return <main>
      <h1>OwnDir Test Suite</h1>

      {tests.map(({label, phase, results, errors}, ti) => {
        const failed = errors?.length > 0;
        const expandLabels = testsExpanded[label];

        return (
          <article
            key={`${ti} - ${label}`}
            className={cStr({test: true, 
                             [phase]: true,  
                             passed: !failed && phase == 'done', 
                             failed})}
          >
            <header>
              <strong>{label}</strong>
                {phase == 'running'
                  ? <progress />
                  : null}
              <button 
                className={cStr({mdi: true, 
                                 "mdi-unfold-more-horizontal": !expandLabels,
                                 "mdi-unfold-less-horizontal": expandLabels})}
                onClick={() => toggleTestExpanded(label)}
              ></button>
            </header>

            <div className={cStr({ results: true, expandLabels })}>
              {results.map((result, ri) => {
                const {pass, exception, message, test, values} = result;
                return ( 
                  <div className={cStr({ result: true })} 
                       key={`${ti}.${ri} - ${label}`}
                       title={message}
                       onClick={() => pass ? console.log(result) : console.error(result) }
                  >
                    <div className={cStr({"result-indicator": true,
                                          passed: pass, 
                                          failed: !pass, 
                                          exception: !!exception})}
                    ></div>
                    {expandLabels ? message : null}
                  </div>)
              })}
            </div>
            
          </article>)
      })}
    </main>
  },

}
