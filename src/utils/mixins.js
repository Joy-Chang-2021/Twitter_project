import moment from 'moment'
moment.locale('zh-tw');

//顯示推文離現在多久
export const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      return datetime ? moment(datetime).startOf('minute').fromNow() : '-'
    }
  }
}

//把推文改成特定格式 ex. pm 10:25:12 , feb 24th 2022
export const timeFormatFilter = {
  filters: {
    timeFormat(datetime) {
      return datetime ? moment(datetime).format('a h:mm．YYYY年M月D日') : '-'
    }
  }
}

//名字前加上@
export const accountTagFilter = {
  filters: {
    accountTag(account) {
      return "@" + account
    }
  }
}

//數字改成XX萬
export const numberFormatTCFilter = {
  filters: {
    numberFormatTC(num) {
      return num > 9999 ? `${Math.floor(num / 10000 * 10) / 10} 萬` : num
    }
  }
}

//數字改成XX千
export const numberFormatEndFilter = {
  filters: {
    numberFormatEnd(num) {
      return num > 999 ? `${Math.floor(num / 1000 * 10) / 10} k` : num
    }
  }
}

export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src || 'https://via.placeholder.com/350x220/DFDFDF?text=No+Image'
    }
  }
}