export interface INavigatePopup {
  id: number
  name: string
  image: string
}

export interface IContacts {
  title: string
  descr: string
  form_names: string[]
  form_examples: string[]
  button_name: string
  types_input: string[]
}

export interface IHome {
  title: string
  description: string
  btn_name: string
  social_link: string[]
}

interface IAboutDescription {
  descr_1: {
    texts: string[],
    images: string[],
  },
  descr_2: {
    texts: string[],
    images: string,
  },
  descr_3: {
    texts: string
    images: string
  },
  descr_4: {
    texts: string,
    title: string,
    list: string[]
    images: string[],
  },
  descr_5: {
    texts: string,
    title: string,
    list: string[]
    images: string[],
  },
}

export interface IAbout {
  title: string
  description: IAboutDescription
}

export interface IAnimation {
  start : boolean
}
