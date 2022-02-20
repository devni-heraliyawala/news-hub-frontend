/* eslint-disable jsx-a11y/anchor-has-content */
import moment from "moment";

const NewsArticle = (props) => {
  const article = props.article;
  const onClickArticleUrl = () => {
    window.open(article?.url);
  };

  return (
    <div>
      <input type="checkbox" id="news-article-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-180">
          <h3 className="font-bold text-center text-lg">News Article</h3>
          <br />
          <div>
            <div className="card w-100 bg-base-100 shadow-xl">
              <figure>
                <img src={article?.urlToImage} alt="article-img" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{article?.title}</h2>
                <br />
                <b>Author </b>
                {article?.author ? (
                  article.author
                ) : (
                  <div className="badge badge-primary">N/A</div>
                )}
                <br />
                <br />
                <b>Source </b>
                {article?.source?.name ? (
                  article.source?.name
                ) : (
                  <div className="badge badge-primary">N/A</div>
                )}
                <br />
                <br />
                <b>Description</b>
                <p>{article?.description}</p>
                <br />
                <b>Content</b>
                <p>{article?.content}</p>
                <br />
                <b>URL</b>
                <p>
                  <a href="/" onClick={onClickArticleUrl}>
                    {article?.url}
                  </a>
                </p>
                <br />
                <p>
                  <b>Published on </b>
                  {moment(article?.publishedAt).format("YYYY-MM-DD")}
                </p>
              </div>
            </div>
          </div>
          <div className="modal-action form-control mt-6">
            <label
              htmlFor="news-article-modal"
              className="btn btn-primary"
              //   onClick={clickHandler}
            >
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsArticle;
