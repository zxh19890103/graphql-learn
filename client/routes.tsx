import React from "react"
import {
  withRouter,
  Link
} from "react-router-dom"
import ptr from "path-to-regexp"

interface RouteConfigItem {
  /** 可由权限配置 */
  permissionId: string;
  /** 菜单名字 */
  name: React.ReactNode;
  /** 路由路径,必传 ,父级一路拼接而成 */
  routeTo?: string;
  /** 路由动态加载,没有时不动态加载 */
  component: any;
  /** 菜单前置的Dom */
  prefixNode?: React.ReactNode;
  /** Root时没有children都可以渲染 是Menu时才会渲染在菜单,Leaf时则不会用于判断显示上级菜单 */
  type?: "Menu" | "Leaf" | "Root";
  children?: RouteConfigItem[];
}

import {
  A,
  AX,
  B
} from "./pages"

const config: RouteConfigItem[] = [
  {
    permissionId: "AAA",
    name: "What A",
    routeTo: "/a",
    component: A,
    children: [
      {
        permissionId: "AAA-XXX",
        name: "What AX",
        routeTo: "x",
        component: AX
      }
    ]
  },
  {
    permissionId: "BBB",
    name: "What B",
    routeTo: "/b",
    component: B
  }
]

const Match = withRouter(({ match, location, history }) => {
  console.log("match", match)
  console.log("history", history)
  console.log("location", location)
  const cs = doMatch(location.pathname, config)
  console.log(cs)
  return <Link to="/a">to A</Link>
})

let basePath = "/"

const getPattern = (to) => {
  if (to.startsWith("/")) return to
  return basePath + to
}

const doMatch = (path: string, items: RouteConfigItem[]) => {
  const components = []
  for (let { routeTo, component, children } of items) {
    const pattern = getPattern(routeTo)
    const r = ptr(pattern)
    const ms = r.exec(path)
    console.log(pattern, path, ms)
    if (ms) {
      components.push(component)
      basePath = pattern
      if (children)
        doMatch(path, children)
      break
    }
  }
  basePath = ""
  return components
}

export {
  Match
}