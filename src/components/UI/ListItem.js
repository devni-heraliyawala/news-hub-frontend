import moment from "moment";

import { handleImageError } from "../../helpers/utils";

const ListItem = (props) => {
  const item = props.item;
  const buttonLabel = props.buttonLabel;

  const onClickListItem = () => {
    window.open(item?.url);
  };

  const onButtonClick = () => {
    props.onListItemButtonClick(item);
  };
  return (
    <div className="card card-side bg-base-100 shadow-xl news-article-list-item">
      <div className="cover-photo-wrapper">
        <img
          className="cover-photo"
          src={item?.urlToImage ? item?.urlToImage : "/default-placeholder.png"}
          alt="Article img"
          onError={() => console.log("Image error")}
        />
      </div>
      <div className="card-body">
        <h2 className="card-title" onClick={onClickListItem}>
          {item?.title}
        </h2>
        <p onClick={onClickListItem}>{item?.description.substring(0, 500)}</p>
        <p onClick={onClickListItem}>
          <b>Published on </b>
          {moment(item?.publishedAt).format("YYYY-MM-DD")}
        </p>
        <div onClick={onClickListItem}>
          <b>Author </b>
          {item?.author ? (
            item.author
          ) : (
            <div className="badge badge-primary">N/A</div>
          )}
        </div>
        <div onClick={onClickListItem}>
          <b>Source </b>
          {item?.source?.name ? (
            item.source?.name
          ) : (
            <div className="badge badge-primary">N/A</div>
          )}
        </div>
        <div className="justify-end card-actions">
          {buttonLabel === "Import" ? (
            <button className="btn btn-outline" onClick={onButtonClick}>
              {buttonLabel}
            </button>
          ) : (
            <label
              htmlFor="news-article-modal"
              className="btn btn-sm btn-outline btn-primary btn-edit"
              style={{ height: "39px" }}
              onClick={onButtonClick}
            >
              View
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListItem;
