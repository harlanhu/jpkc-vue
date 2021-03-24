import webResource from "@/api/webResource/webResource";
import verifyCode from "@/api/verifyCode/verifyCode";
import account from "@/api/account/account";
import category from "@/api/category/category";
import user from "@/api/user/user";
import smsVerifyCode from "@/api/smsVerifyCode/smsVerifyCode";
import course from "@/api/course/Course";
import liveCourse from "@/api/liveCourse/liveCourse";
import teacher from "@/api/teacher/teacher";
import school from "@/api/school/school";
import section from "@/api/section/section";
import sectionComment from "@/api/sectionComment/sectionComment";
import layout from "@/api/layout/layout";

/**
 * 数据请求唯一入口
 */
export default {
  webResource,
  verifyCode,
  account,
  category,
  user,
  smsVerifyCode,
  course,
  liveCourse,
  teacher,
  school,
  section,
  sectionComment,
  layout
}
