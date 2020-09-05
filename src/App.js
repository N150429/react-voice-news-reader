import React, { useState, useEffect } from "react";
import alaBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles.js";
import wordsToNumbers from "words-to-numbers";
import { Typography } from "@material-ui/core";
const alaKey =
  "babdad832a02e7a7d8ad3e53d95a27142e956eca572e1d8b807a3e2338fdd0dc/stage";
const alanLogoSrc = "https://alan.app/voice/images/previews/preview.jpg";
const App = () => {
  const [newsArticles, setnewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);

  const classes = useStyles();
  useEffect(() => {
    alaBtn({
      key: alaKey,
      onCommand: ({ command, articles, number }) => {
        if (command === "newHeadlines") {
          setnewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alaBtn().playText("Please try that again");
          } else {
            window.open(article.url, "_blank");
            alaBtn().playText("Opening....,,");
          }
        }
      },
    });
  }, []);
  return (
    <div>
      <div className={classes.logoContainer}>
        {newsArticles.length ? (
          <div className={classes.infoContainer}>
            <div className={classes.card}>
              <Typography variant="h5" component="h2">
                Try saying: <br />
                <br />
                Open article number [4]
              </Typography>
            </div>
            <div className={classes.card}>
              <Typography variant="h5" component="h2">
                Try saying: <br />
                <br />
                Go back
              </Typography>
            </div>
          </div>
        ) : null}
        <img src={alanLogoSrc} className={classes.alanLogo} alt="alan logo" />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
};

export default App;
