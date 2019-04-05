import HTMLFactory from "./../HTMLFactory"
import loginHandler from "../loginScripts/loginHandler"
import apiCall from "../articleScripts/articleApi"
import articleHandler from "../articleScripts/articleEventHanlder"

// The buildArticleFragment function builds up the html and appends to the article
// fragment


const articleSection = {
    buildArticleWithObj: () => {
        let fragment = document.createDocumentFragment()
        let activeUser = sessionStorage.getItem("userID")
        apiCall.getArticles(activeUser).then(parsedArray => {
            console.log(parsedArray)
            parsedArray.forEach(obj => {
                const objectTitle = HTMLFactory.createElementWithText("p", `${obj.title}`, "objectTitle")
                const objectSynopsis = HTMLFactory.createElementWithText("p", `${obj.synopsis}`, "objectSynopsis")
                const objectUrl = HTMLFactory.createElementWithText("p", `${obj.url}`, "objectUrl")
                fragment.appendChild(objectTitle)
                fragment.appendChild(objectSynopsis)
                fragment.appendChild(objectUrl)
                //  buildArticle(fragment)
            });
        }).then(e => {
            let articleDom = document.getElementById("articleBody")
            articleDom.appendChild(fragment)
        })
    },
    _buildArticle: function () {
        // creating html
        const articleFragment = document.createDocumentFragment();
        const articleCard = HTMLFactory.createElementWithText("div", undefined, "articleCard");
        const articleTitle = HTMLFactory.createElementWithText("h1", "Articles", "articleTitle");
        const articleBody = HTMLFactory.createElementWithText("div", undefined, "articleBody");
        const createArticleButton = HTMLFactory.createElementWithText("button", "Create New Article", "newArticle");
        createArticleButton.addEventListener("click", articleHandler.createNewArticle);

        const articleTitleLabel = HTMLFactory.createElementWithText("label", "Title: ", "articleTitleLabel");
        const articleTitleInput = HTMLFactory.createElementWithText("input", undefined, "articleTitleInput");
        const articleSynopsisLabel = HTMLFactory.createElementWithText("label", "Synopsis: ", "articleSynopsisLabel");
        const articleSynopsisInput = HTMLFactory.createElementWithText("input", undefined, "articleSynopsisInput");
        const articleUrlLabel = HTMLFactory.createElementWithText("label", "URL: ", "articleUrlLabel");
        const articleUrlInput = HTMLFactory.createElementWithText("input", undefined, "articleUrlInput");
        // appending to article fragment
        articleFragment.appendChild(articleCard);
        articleFragment.appendChild(articleTitle);
        articleFragment.appendChild(articleBody);
        articleFragment.appendChild(createArticleButton);
        articleFragment.appendChild(articleTitleLabel);
        articleFragment.appendChild(articleTitleInput);
        articleFragment.appendChild(articleSynopsisLabel);
        articleFragment.appendChild(articleSynopsisInput);
        articleFragment.appendChild(articleUrlLabel);
        articleFragment.appendChild(articleUrlInput);
        return articleFragment;
    },
    get buildArticle() {
        return this._buildArticle;
    },
    set buildArticle(value) {
        this._buildArticle = value;
    },
    createNewArticle: (title, synopsis, url, activeUser,) => {
        return {
            title: title,
            synopsis: synopsis,
            url: url,
            userId: activeUser,
            timeStamp: new Date()

        }
    },

}

export default articleSection;