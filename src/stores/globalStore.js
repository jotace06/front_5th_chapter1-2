import { createStore } from "../lib";
import { userStorage } from "../storages";

const 초 = 1000;
const 분 = 초 * 60;
const 시간 = 분 * 60;

export const globalStore = createStore(
  {
    currentUser: userStorage.get(),
    loggedIn: Boolean(userStorage.get()),
    posts: [
      {
        id: 1,
        author: "홍길동",
        time: Date.now() - 5 * 분,
        content: "오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",
        likeUsers: [],
      },
      {
        id: 2,
        author: "김철수",
        time: Date.now() - 15 * 분,
        content: "새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",
        likeUsers: [],
      },
      {
        id: 3,
        author: "이영희",
        time: Date.now() - 30 * 분,
        content: "오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",
        likeUsers: [],
      },
      {
        id: 4,
        author: "박민수",
        time: Date.now() - 30 * 분,
        content: "주말에 등산 가실 분 계신가요? 함께 가요!",
        likeUsers: [],
      },
      {
        id: 5,
        author: "정수연",
        time: Date.now() - 2 * 시간,
        content: "새로 나온 영화 재미있대요. 같이 보러 갈 사람?",
        likeUsers: [],
      },
    ],
    error: null,
  },
  {
    logout(state) {
      userStorage.reset();
      return { ...state, currentUser: null, loggedIn: false };
    },

    toggleLike(state, postId) {
      // 로그인 상태가 아니면 경고 메시지 표시 후 현재 상태 반환
      if (!state.loggedIn) {
        alert("로그인 후 이용해주세요");
        return state;
      }

      // 포스트 목록 업데이트
      const updatedPosts = state.posts.map((post) => {
        if (post.id === postId) {
          const { username } = state.currentUser;
          const isLiked = post.likeUsers.includes(username);

          if (isLiked) {
            // 이미 좋아요를 눌렀으면 취소 (해당 사용자 제거)
            return {
              ...post,
              likeUsers: post.likeUsers.filter((user) => user !== username),
            };
          } else {
            // 좋아요를 누르지 않았으면 추가
            return {
              ...post,
              likeUsers: [...post.likeUsers, username],
            };
          }
        }
        return post;
      });

      // 업데이트된 posts로 새 상태 반환
      return { ...state, posts: updatedPosts };
    },

    addPost(state, content) {
      if (!state.loggedIn || !state.currentUser) {
        alert("로그인 후 이용해주세요");
        return state;
      }

      // 새 포스트 객체 생성
      const newPost = {
        id: Date.now(), // 현재 시간을 ID로 사용 (고유값)
        author: state.currentUser.username,
        time: Date.now(),
        content,
        likeUsers: [],
      };

      // 새 포스트를 배열 앞에 추가하여 새 상태 반환
      return { ...state, posts: [newPost, ...state.posts] };
    },
  },
  {
    // 주어진 포스트 ID에 현재 사용자가 좋아요를 눌렀는지 확인하는 헬퍼 함수
    getIsLiked(state, postId) {
      if (!state.loggedIn || !state.currentUser) return false;

      const post = state.posts.find((post) => post.id === postId);
      if (!post) return false;

      return post.likeUsers.includes(state.currentUser.username);
    },
  },
);
