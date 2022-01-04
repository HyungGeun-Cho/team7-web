import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./MainPage.scss";
import PostItem from "./PostItem/PostItem";
import PostListControlBar from "./PostListControlBar/PostListControlBar";
import Header from "./Header/Header";

// 더미 데이터
const dummyData = [
  {
    id: 1,
    title: "2021 나만의 도시 여행기",
    summary: "2021년 다녀본 국내 여행지들 모음",
    postImg:
      "https://github.githubassets.com/images/modules/logos_page/Octocat.png",
    date: "2021년 12월 7일",
    comments: 7,
    authorImg:
      "https://github.githubassets.com/images/modules/logos_page/Octocat.png",
    author: "김와플",
    likes: 100,
  },
  {
    id: 2,
    title: "클라우드프론트 배포방법",
    summary: "클라우드프론트 배포방법에 대해",
    postImg:
      "https://github.githubassets.com/images/modules/logos_page/Octocat.png",
    date: "2021년 12월 7일",
    comments: 7,
    authorImg:
      "https://github.githubassets.com/images/modules/logos_page/Octocat.png",
    author: "이와플",
    likes: 65,
  },
  {
    id: 3,
    title: "도시데이터 창업 사례들",
    summary: 1,
    postImg:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2560px-React-icon.svg.png",
    date: "2021년 12월 7일",
    comments: 7,
    authorImg:
      "https://github.githubassets.com/images/modules/logos_page/Octocat.png",
    author: "한와플",
    likes: 47,
  },
  {
    id: 4,
    title: "도시데이터 종류와 활용",
    summary: "도시데이터 종류와 활용",
    postImg:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2560px-React-icon.svg.png",
    date: "2021년 12월 7일",
    comments: 7,
    authorImg:
      "https://github.githubassets.com/images/modules/logos_page/Octocat.png",
    author: "우와플",
    likes: 39,
  },
  {
    id: 5,
    title: "벨로그 웹 개발 이야기 이것은 기기기긱기기기기기기기긴 제목",
    summary:
      "벨로그 서비스 개발을 직접 해보다! 도화지 서비스 개발을 직접 해보다! 도화지 서비스 개발을 직접 해보다! 도화지 서비스 개발을 직접 해보다! 도화지 서비스 개발을 직접 해보다! 도화지 서비스 개발을 직접 해보다! 도화지 서비스 개발을 직접 해보다!",
    postImg:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2560px-React-icon.svg.png",
    date: "2021년 12월 7일",
    comments: 7,
    authorImg:
      "https://github.githubassets.com/images/modules/logos_page/Octocat.png",
    author: "조형근",
    likes: 23,
  },
];

const MainPage = () => {
  const [trendPeriod, setTrendPeriod] = useState(7);
  const [trendingPostList, setTrendingPostList] = useState([]);
  const [trendingPostPage, setTrendingPostPage] = useState(0);

  useEffect(() => {
    axios
      .get("https://waflog.kro.kr/api/v1/post/trend", {
        params: {
          page: 0,
          size: 4,
          date: trendPeriod
        }
      })
      .then((response) => {
        console.log(response);
        setTrendingPostList(response.data.content);

        if (response.data.last === true) {
          setTrendingPostPage(null);
        }
        else{
          setTrendingPostPage(1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [trendPeriod]);

  const trendingPostRef = useRef({});

  const handleScroll = () => {
    const scrollTop = trendingPostRef.current.scrollTop;
    const scrollHeight = trendingPostRef.current.scrollHeight;
    const clientHeight = trendingPostRef.current.clientHeight;

    if (scrollHeight - scrollTop - clientHeight === 0) {
      console.log("BOTTOM!!!!!")
      console.log(trendingPostPage);
      if (!(trendingPostPage === null)) {
        axios
          .get("https://waflog.kro.kr/api/v1/post/trend", {
            params: {
              page: trendingPostPage,
              size: 4,
              date: trendPeriod
            }
          })
          .then((response) => {
            setTrendingPostList(trendingPostList.concat(response.data.content));
            if (response.data.last === true) {
              setTrendingPostPage(null);
            } else {
              setTrendingPostPage(trendingPostPage + 1);
            }
            console.log(response);
          });
      }
    }
  };

  return (
    <div className="mainpage" ref={trendingPostRef} onScroll={handleScroll}>
      <Header />
      <PostListControlBar
        trendPeriod={trendPeriod}
        setTrendPeriod={setTrendPeriod}
        setTrendingPostPage={setTrendingPostPage}
      />

      <ul className={"PostList"}>
        {trendingPostList.map((item) => (
          <PostItem item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

export default MainPage;