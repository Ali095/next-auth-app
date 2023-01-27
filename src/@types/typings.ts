export type CardType = {
    id: number,
    title: string,
    desc: string,
    img: string,
}

export type RecipeFieldProps = {
    id: number,
    label: string,
    value: string
}

export type SelectOption = {
    label: string,
    value: string | number
}

export type SelectProps = {
    value?: SelectOption,
    options: SelectOption[],
    onChange: (value: SelectOption | undefined) => void
}


export type User = {
    id: string
    name: string
    avatar: string
    email: string
    role: string
    plan: string
    billing: string
    signupDate: string
    lastLogin: string
    status: string
}
