
import { createCustomComponent } from 'vue-amap'
const customSearch = createCustomComponent({
  template: `<div class="search_bar">
    <input :value="SpecificAddress" style="width:100%" class="custom-componet-input" :id="id" placeholder="请输入详细地址" />
  </div>`,
  props: {
    city: {
      type: String,
      default: ''
    },
    SpecificAddress: String
  },
  data () {
    return {
      id: `custom-componet-input-${Math.random()}`
    }
  },
  watch: {
    city (val) {
      this.init()
    }
  },
  contextReady () {
    AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], () => {
      const autocomplete = new AMap.Autocomplete({
        city: this.city,
        input: this.id
      })
      AMap.event.addListener(autocomplete, 'select', (e) => {
        this.$emit('select', e.poi)
      })
      this.$amapComponent = autocomplete
    })
  },
  methods: {
    init () {
      AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], () => {
        const autocomplete = new AMap.Autocomplete({
          city: this.city,
          input: this.id
        })
        AMap.event.addListener(autocomplete, 'select', (e) => {
          this.$emit('select', e.poi)
        })
        this.$amapComponent = autocomplete
      })
    }
  }
})

export default customSearch
