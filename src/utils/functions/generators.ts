import RouteEnum from "../../const/routes"

export const generateRoute = (route: RouteEnum, data: Record<string, string | number>): string => {
    let buffer: string = route;
    for (const key in data) {
        const regExp = new RegExp(`/:${key}/?`)
        buffer = buffer.replace(regExp, `/${data[key]}/`)
    }
    return buffer;
}

export const getProfileRoute = (userId: string | number) => generateRoute(RouteEnum.PROFILE, {
    id: userId
})

export const getPostsRoute = (userId: string | number) => generateRoute(RouteEnum.POSTS, {
    id: userId
})
