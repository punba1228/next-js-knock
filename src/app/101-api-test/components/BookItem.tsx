
export interface BookItemProps {
  url: string;
  imgUrl: string;
  title: string;
  author: string;
  publisherName: string;
}

const BookItem: React.FC<BookItemProps> = (props) => {
  return (
    <li className="inline-block w-1/4 pt-0 pb-5 pr-0 pl-5 align-top text-center sm:w-1/2 mb:w-1/3">
      <div className="w-full max-w-48 mt-0 m-auto">
        <a className="block no-underline">
          {/* <Image
            className="mb-5 w-full max-w-36 shadow shadow-slate-400"
            src={props.imgUrl || ""}
            alt={props.title || ""}
          /> */}
          <p className="mb-3 pl-2 -indent-2 leading-3 text-left text-sm">
            {props.title}
          </p>
          <p>{props.author}</p>
          <p>{props.publisherName}</p>
        </a>
      </div>
    </li>
  );
};

export default BookItem;
