import router from "@/router";
import { getUserInfo } from "@/api/login";
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("faka-token");
  if (!token) {
    if (to.path != "/admin") {
      next({
        path: "/admin"
      });
    } else {
      next();
    }
  } else {
    if (to.path === "/admin") {
      next();
    } else {
      const userInfo = localStorage.getItem("faka-user");
      if (userInfo) {
        next();
      } else {
        getUserInfo(token).then(res => {
          const resp = res.data;
          if (resp.flag) {
            localStorage.setItem("faka-user", JSON.stringify(resp.data));
            next();
          } else {
            next({
              path: "/admin"
            });
          }
        });
      }
    }
  }
});
