"use client";

import React, { useState, useEffect, useRef , DependencyList} from "react";
import BookItem, { BookItemProps } from "./BookItem";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";

export interface ApiContainerProps {
  title: string;
}

export interface IGetRequest {
    applicationId: string;
    keyword: string;
    hits: number;
    page: number;
    booksGenreId: string;
}

export interface IGetResponse {
  GenreInformation: [];
  items: IBook[];
  carrier: number;
  count: number;
  first: number;
  hits: number;
  last: number;
  page: number;
  pageCount: number;
}

export interface IBook {
  item: {
    affiliateUrl: string;
    artistName: string;
    author: string;
    availability: string;
    booksGenreId: string;
    chirayomiUrl: string; 
    discountPrice: number;
    discountRate: number; 
    hardware: string;
    isbn: string;
    itemCaption: string;
    itemPrice: number;
    itemUrl: string;
    jan: string;
    label: string;
    largeImageUrl: string;
    limitedFlag: number;
    listPrice: number;
    mediumImageUrl: string;
    os: string;
    postageFlag: number;
    publisherName: string;
    reviewAverage: string;
    reviewCount: number;
    salesDate: string;
    seriesName: string;
    title: string;
  }
}

export const useUpdateEffect = (callback: () => void, deps: DependencyList) => {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    return callback();
  }, deps);
}

const ApiContainer: React.FC<ApiContainerProps> = (props) => {
  // React Hooks
  const [inputKeyword, setInputKeyword] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchPage, setSearchPage] = useState(1);
  const [apiResponse, setApiResponse] = useState<IGetResponse | null>(null);
  const [books, setBooks] = useState<BookItemProps[]>([]);
  const renderFlgRef = useRef(false)

  const requestData: IGetRequest = {
    applicationId: "1096525417627568230",
    keyword: searchKeyword,
    hits: 20,
    page: searchPage,
    booksGenreId: "001",
  }
      
  const options: AxiosRequestConfig = {
    baseURL: "https://app.rakuten.co.jp/services/api",
    url: "/BooksTotal/Search/20170404?",
    method: "GET",
    params: requestData,
  }

  // const createBooks = (data: IGetResponse) => {
  //   console.log(data);
  //   const items = data.items;
  //   const newBooks: BookItemProps[] = [];
  //   console.log(newBooks);
  //   items.forEach((item: any) => {
  //     console.log(item);
  //     newBooks.push({
  //       url: item.Item.url,
  //       imgUrl: item.Item.largeImageUrl,
  //       title: item.Item.title,
  //       author: item.Item.author,
  //       publisherName: item.Item.publisherName,
  //     });
  //   });
  //   console.log(newBooks);
  //   return newBooks;
  // };

  const createBooks = (res: AxiosResponse) => {
    console.log("3");
    const items = res.data.items;
    console.log(JSON.parse(JSON.stringify(items)));
    const newBooks: BookItemProps[] = [];
    items.forEach((item: any) => {
      newBooks.push({
        url: item.item.url,
        imgUrl: item.item.largeImageUrl,
        title: item.item.title,
        author: item.item.author,
        publisherName: item.item.publisherName,
      });
    });
    return newBooks;
  };

  const fetchBooks = async () => {
    await axios(options)
      // 200
      // .then((res: AxiosResponse<IGetResponse>) => {
      .then( (res: AxiosResponse) => {
        console.log("2");
        console.log(JSON.parse(JSON.stringify(res)));
        const books = createBooks(res);
        // setApiResponse(res.data);
        console.log(books);
      })
      // 400
      .catch((error) => {
        // setBooks([]);
        // console.log(books);
      });
  }
  
  const handleClickSearchButton = async () => {
    console.log("handleClickSearchButton")
    // 検索キーワードが同じ場合、ページを進める
    if (searchKeyword === inputKeyword) {
      setSearchPage(searchPage + 1);
    }
    // 検索キーワードが異なる場合、検索キーワードを更新
    else {
      setSearchKeyword(inputKeyword);
      setSearchPage(1);
    }
  }

  // useEffect(() => {
  //   // 初回レンダリング時に実行させない
  //   if (renderFlgRef.current) {
  //     fetchBooks();
  //   } else {
  //     renderFlgRef.current = true;
  //   }
  // }, [searchKeyword, searchPage]); // eslint-disable-line react-hooks/exhaustive-deps

  useUpdateEffect(() => {
    console.log("useUpdateEffect: searchKeyword, searchPage")
      fetchBooks();
  }, [searchKeyword, searchPage]);

  useUpdateEffect(() => {
        const newBooks: BookItemProps[] = [];
        console.log(apiResponse);
        apiResponse && console.log(apiResponse.items);
        // apiResponse && apiResponse.items.forEach(async (item: IBook) => {
        //   console.log(item);
          // const book = await createBook(item);
          // console.log(book);
          // newBooks.push(book);
        // });
        // setBooks(newBooks);
  }, [apiResponse]);

  // useUpdateEffect(() => {
  //   // console.log(apiResponse);
  //   if (apiResponse) {
  //     const items = apiResponse.items;
  //     const newBooks: BookItemProps[] = [];
  //     items.forEach(async (item: IBook) => {
  //       const book = await createBook(item);
  //       newBooks.push(book);
  //     });
  //     setBooks(newBooks);
  //   }
  //   // setBooks();
  // }, [apiResponse]); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <>
      <header className="w-full bg-cyan-300">
        <p className="leading-10 text-center text-xl text-white py-3">
          {props.title}
        </p>
      </header>
      <div className="overflow-hidden mb-5 bg-white shadow-gray-400 shadow">
        <div className="w-full">
          <input
            className="w-full mb-5 px-3 py-0 leading-10 text-mb border-b border-solid box-border border-gray-300"
            type="text"
            value={inputKeyword}
            placeholder="検索する"
            onChange={(e) => setInputKeyword(e.target.value)}
          />
        </div>
        <button onClick={handleClickSearchButton} className="block mt-0 mx-auto mb-5 px-4 leading-10 border-none text-mb text-white bg-cyan-300 hover:bg-cyan-700">
          検索する
        </button>
      </div>
      <ul className="ml-20 overflow-hidden">
        {books.length !== 0 && books.map((book: BookItemProps, index: number) => {
          return (
            <BookItem
              key={index}
              url={book.url}
              imgUrl={book.imgUrl}
              title={book.title}
              author={book.author}
              publisherName={book.publisherName}
            />
          );
        })}
      </ul>
    </>
  );
};

export default ApiContainer;
