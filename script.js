// Wait for the document to load before running the script 
(function ($) {
  
  let $inputs = [1,2,3,4,5].map(x => $(`word${x}`))
  let $result = $('result')

  let updateResult = () => {
    console.log('updateResult')
    try {
      let filterStrs = $inputs.map($input => $input.value()).filter(x => !!x)
      console.log('filterStrs', filterStrs)
  
      let applyFilterStr = (filterStr, words) => {
        console.log('applyFilterStr', filterStr)
        // ба!нан? 
        let rules = []

        let index = 0
        let filter = filterStr.toLowerCase()
        while (filter){
          let letter = filter[0]
          let nextLetter = filter[1]
          if(nextLetter === '!')          {
            rules.push(word => word[index] === letter)
          }
          else if(nextLetter === '?')          {
            rules.push(word => word[index] !== letter)
            rules.push(word => word.includes(letter))
          }
          else {
            rules.push(word => !word.includes(letter))
          }

          index++
        }   
        
        console.log('rules', rules)     

        let isFitToFilter = word => rules.every(rule => rule(word))
        
        let result = words.filter(isFitToFilter)
        console.log('result', result)     

        return result
      }
      let resultWords = filterStrs.reduce(applyFilterStr, words5Array)
      let resultStr = resultWords.slice(0, 20).join('\n')

      $result.value(resultStr)
    }
    catch (e) {
      $result.value(`Error: ${e}`)
    }
  }

  $inputs.map($input => $input.on('change', updateResult))

})(jQuery);
