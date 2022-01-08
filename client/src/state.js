import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil'

const authState = atom({
  key: "loginState",
  default: false
})

export { authState }