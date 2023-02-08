// Wait for the document to load before running the script 
(function ($) {
  
  let $inputs = [1,2,3,4,5].map(x => $(`word${x}`))
  let $result = $('result')

  let updateResult = () => {
    try {
      let filterStrs = $inputs.map($input => $input.value()).filter(x => !!x)
  
      let applyFilterStr = (filterStr, words) => {
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

        let isFitToFilter = word => rules.every(rule => rule(word))
        
        return words.filter(isFitToFilter)
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
