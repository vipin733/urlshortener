let baseurl = process.env.NEXT_PUBLIC_URL_BASE 

export const _authUrl  = () : string => {
    return `${baseurl}` +  "api/auth/me" 
}

export const _logoutUrl  = () : string => {
    return `${baseurl}` +  "api/auth/logout" 
}

export const _allGetUrlUrl  = () : string => {
    return `${baseurl}` +  "api/auth/urls" 
}

export const _createUrlUrl  = () : string => {
    return `${baseurl}` +  "api/auth/create" 
}

export const _loginUrl  = (): string => {
    return `${baseurl}` +  "api/guest/login"
}


export const _registerUrl  = () : string => {
    return `${baseurl}` +  "api/guest/create-user"
}

