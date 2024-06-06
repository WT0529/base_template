<script setup lang="ts" name="Home">
import type { UserProperty } from "@/types/api.d";
// import type { IndexFormData } from "@/types/pages.d";

// 导入接口api
import { userQuery } from "@api/user";
// 导入本地SVG图片
import Svg3 from "@assets/svg/3.svg";
// 导入校验项
// import { validateUsername, validatePassword, validateConfirmPassword, validateAge } from '@/pugins/validators'

// 导入store
// import {useUserStore} from "@stores/user"
const user = useUserStore().getUserName;
// 使用vueuse
const { x, y } = useMouse();
// mock接口
const users = ref<UserProperty[]>([]);
userQuery().then((response) => {
  users.value = response.data.data;
});


// // 表单校验
// const formData = ref<IndexFormData>(
//   {
//     username: '',
//     password: '',
//     confirmPassword: '',
//     age: ''
//   }
// )
// // 表单校验规则
// const rules = reactive<FormRules<IndexFormData>>({
//   username: [{ validator: validateUsername, trigger: 'blur' }],
//   password: [{ validator: validatePassword, trigger: 'blur' }],
//   confirmPassword: [{
//     validator: (_rule: any, value: string, callback: any) => {
//       validateConfirmPassword(value, formData.value.password)
//     }, trigger: 'blur'
//   }],
//   age: [{ validator: validateAge, trigger: 'blur' }]
// })
// // 表单校验方法

// const submitForm = async (formEl: FormInstance | undefined) => {
//   if (formEl) {
//     formEl.validate().then((valid: any) => {
//       if (valid) {
//         console.log(formData.value);
//       } else {
//         console.log('error submit!!');
//         return false;
//       }
//     });
//   }
// }

</script>
<!-- 路由配置 -->
<route lang="yaml">
name: Home
meta:
  requiresAuth: true
  layout: Single
</route>

<template>
  <div class="w-250 bg-white border-2 border-green-300 rounded-lg space-y-5">
    <h1 class="text-center font-bold text-2xl font-mono py-4">
      项目内容使用案例
    </h1>
    <div class="px-4">
      <h2 class="font-bold text-1xl font-mono">1.网络图标使用</h2>
      <div class="">
        <div class="flex items-center py-2 space-x-4">
          <span class="font-black text-12 font-mono">格式为:</span>
          <span class="">i-{collection}-{some-icon-name}</span>
          <span><i-mdi-ab-testing></i-mdi-ab-testing></span>
        </div>
        <div class="flex items-center py-2 space-x-4">
          <span class="font-black text-12 font-mono">图标库：</span>
          <span><a href="https://icon-sets.iconify.design/" class="text-blue-500 hover:text-blue-700">Iconify</a></span>
        </div>
      </div>
    </div>

    <div class="px-4">
      <h2 class="font-bold text-1xl font-mono">2.使用本地svg图片</h2>
      <div class="">
        <div class="flex items-center py-2 space-x-4">
          <span class="font-black text-12 font-mono">格式为:</span>
          <span class="">import Svg3 from '@assets/svg/3.svg'</span>
        </div>
        <div class="flex items-center py-2 space-x-4">
          <span class="font-black text-12 font-mono flex-shrink-0">案例:</span>
          <span>
            <Svg3 width="70" height="70" />
          </span>
        </div>
      </div>
    </div>

    <div class="px-4">
      <h2 class="font-bold text-1xl font-mono">3.使用本地svg图标</h2>
      <div class="">
        <div class="flex items-center py-2 space-x-4">
          <span class="font-black text-12 font-mono flex-shrink-0">格式为:</span>
          <span class="">封装的SVGIcon组件，只需将图标放到assets/icons目录下 &lt;SvgIcon
            name="图标名称" size="30" /&gt;</span>
        </div>
        <div class="flex items-center py-2 space-x-4">
          <span class="font-black text-12 font-mono flex-shrink-0">案例:</span>
          <span>
            <SvgIcon name="test" size="30" />
          </span>
        </div>
      </div>
    </div>

    <div class="px-4">
      <h2 class="font-bold text-1xl font-mono">4.使用pinia</h2>
      <div class="">
        <div class="flex items-center py-2 space-x-4">
          <span class="font-black text-12 font-mono flex-shrink-0">使用方式:</span>
          <span class="">可以文件内导入 import {useUserStore} from
            "@stores/user",也可以在vite.config文件内配置自动导入，页面直接使用useUserStore().getUserName</span>
        </div>
        <div class="flex items-center py-2 space-x-4">
          <span class="font-black text-12 font-mono flex-shrink-0">案例:</span>
          <span>用户名:{{ user }}</span>
        </div>
      </div>
    </div>

    <div class="px-4">
      <h2 class="font-bold text-1xl font-mono">5.使用vueUse</h2>
      <div class="">
        <div class="flex items-center py-2 space-x-4">
          <span class="font-black text-12 font-mono flex-shrink-0">使用方式:</span>
          <span class="">已全局导入直接使用 const { x, y } = useMouse()</span>
        </div>
        <div class="flex items-center py-2 space-x-4">
          <span class="font-black text-12 font-mono flex-shrink-0">案例:</span>
          <span>{{ $t("home.mouse position") }}:{{ x }},{{ y }}</span>
        </div>
      </div>
    </div>

    <div class="px-4">
      <h2 class="font-bold text-1xl font-mono">6.Axios接口</h2>
      <div class="">
        <div class="flex items-center py-2 space-x-4">
          <span class="font-black text-12 font-mono flex-shrink-0">使用方式:</span>
          <span class="">导入接口api(默认mock数据) import { userQuery } from
            '@api/user'</span>
        </div>
        <div class="flex items-center py-2 space-x-4">
          <span class="font-black text-12 font-mono flex-shrink-0">案例:</span>
          <div>
            <p v-for="(item, index) in users" :key="index" class="space-x-4 text-sm">
              <span>姓名： {{ item.name }}</span>
              <span>年龄：{{ item.age }}</span>
              <span>身高：{{ item.height }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="px-4">
      <h2 class="font-bold text-1xl font-mono">7.vitest单元测试</h2>
      <div class="">
        <div class="flex items-center py-2 space-x-4">
          <span class="font-black text-12 font-mono flex-shrink-0">使用方式:</span>
          <span class="">单元测试直接在根目录/tests下编写测试文件，文件名必须以.test.ts结尾，运行命令
            npm run test:unit</span>
        </div>
        <div class="flex items-center py-2 space-x-4">
          <span class="font-black text-12 font-mono flex-shrink-0">案例:</span>
          <div></div>
        </div>
      </div>
    </div>

    <div class="px-4">
      <h2 class="font-bold text-1xl font-mono">8.form表单校验</h2>
      <div class="">
        <div class="flex items-center py-2 space-x-4">
          <span class="font-black text-12 font-mono flex-shrink-0">使用方式:</span>
          <span class="">未安装element plus 代码如下,rules统一写在pugins/validators.ts文件中，页面导入规则即可使用</span>
        </div>
        <div class="flex items-center py-2 space-x-4">
          <span class="font-black text-12 font-mono flex-shrink-0">案例:</span>
          <div>
            <pre>
              <code>
                &lt;el-form ref="form" :model="formData" :rules="rules" label-width="100px"&gt;
                  &lt;el-form-item label="用户名" prop="username"&gt;
                    &lt;el-input v-model="formData.username">&lt;/el-input&gt;
                    &lt;/el-form-item&gt;
                  &lt;el-form-item label="密码" prop="password"&gt;
                    &lt;el-input type="password" v-model="formData.password"&gt;&lt;/el-input&gt;
                  &lt;/el-form-item&gt;
                  &lt;el-form-item label="确认密码" prop="confirmPassword"&gt;
                    &lt;el-input type="password" v-model="formData.confirmPassword"&gt;&lt;/el-input&gt;
                  &lt;/el-form-item&gt;
                  &lt;el-form-item label="年龄" prop="age"&gt;
                    &lt;el-input type="number" v-model="formData.age"&gt; &lt;/el-input&gt;
                  &lt;/el-form-item&gt;
                  &lt;el-form-item&gt;
                    &lt;el-button type="primary" @click="submitForm"&gt;提交&lt;/el-button&gt;
                  &lt;/el-form-item&gt;
                &lt;/el-form&gt;
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>




  </div>
</template>

<style lang="scss" scoped></style>
