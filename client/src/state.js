import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil'

export const authState = atom({
  key: "loginState",
  default: null
})