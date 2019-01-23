
import { createCustomComponent } from 'vue-amap'
const customSearch = createCustomComponent({
  template: `<div class="search_bar">
    <textarea :value="SpecificAddress" style="width:100%" class="custom-componet-input" :id="id" placeholder="请输入详细地址"></textarea>
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
    this.init()
  },
  methods: {
    init () {
      AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], () => {
        const autocomplete = new AMap.Autocomplete({
          city: this.city,
          input: this.id
        })
        AMap.event.addListener(autocomplete, 'select', (e) => {
          console.log(e)
          this.$emit('select', e.poi)
        })
        this.$amapComponent = autocomplete
        console.log(autocomplete)
      })
    }
  }
})

export default customSearch
