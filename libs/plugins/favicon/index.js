
const favicon = `<svg 
  xmlns="http://www.w3.org/2000/svg" 
  viewBox="0 0 100 100"
>
  <text y=".9em" font-size="90">🕮</text>
</svg>
`

module.exports = function (homestead) {

  homestead.H.routes.push(
    ["/favicon.ico",
      ["get", async function (req, res, next) {
        res.setHeader("content-type", "image/svg+xml")
        res.send(favicon)
      }]
    ]
  )
}

