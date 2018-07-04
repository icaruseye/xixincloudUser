// export default file => () => import('@/views' + file)
export default file => resolve => { require([`@/views${file}`], resolve) }