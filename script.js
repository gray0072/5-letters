// Wait for the document to load before running the script 
(function ($) {
  
  let $inputs = [1,2,3,4,5].map(x => $(`word${x}`))
  let $result = $('result')

  let updateResult = () => {
    console.log('updateResult')
    try {
      let filterStrs = $inputs.map($input => $input.val()).filter(x => !!x)
      console.log('filterStrs', filterStrs)
  
      let applyFilterStr = (filterStr, words) => {
        console.log('applyFilterStr', filterStr)
        // ар!буз? 
        // !word.includes('а')
        // word[1] = 'р'
        // !word.includes('б')
        // !word.includes('у')
        // word[4] != 'з'
        // word.includes('з')
        
        let rules = []

        let index = 0
        let filter = filterStr.toLowerCase()
        while (filter){
          let letter = filter[0]
          let nextLetter = filter[1]
          if(nextLetter === '!')          {
            rules.push(word => word[index] === letter)
            filter = filter.substring(2)
          }
          else if(nextLetter === '?')          {
            rules.push(word => word[index] !== letter)
            rules.push(word => word.includes(letter))
            filter = filter.substring(2)
          }
          else {
            rules.push(word => !word.includes(letter))
            filter = filter.substring(1)
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

      $result.val(resultStr)
    }
    catch (e) {
      $result.val(`Error: ${e}`)
    }
  }

  $inputs.map($input => $input.on('change', updateResult))
  updateResult()

})(jQuery);
