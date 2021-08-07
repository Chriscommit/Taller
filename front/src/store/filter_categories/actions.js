export const SET_FILTER = "set filter"

export const filters = {
    SHOW_ALL : "show_all",
    SHOW_SPORT : "show sport",
    SHOW_VINTAGE : "show vintage",
    SHOW_LUXE : "show luxe",
    SHOW_COLLECTION : "show collection"
}

export const setFilter = filter => {
    return {
        type: SET_FILTER,
        filter
    }
}