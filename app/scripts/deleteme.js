  //EDIT Item
  //user clicks on edit button
  $('ul').on('click', '.edit',function(){
    //get its parent (li)
    var parent = $(this).parent();
    //check its parent  class
    if (!parent.hasClass('beingEdited')) {
      parent.addClass('beingEdited');
      $('button.edit').removeClass('glyphicon-pencil')
      $('button.edit').addClass('glyphicon-ok-circle');
    }else if (parent.hasClass('beingEdited')) {
      //grab the value entered in the input and set as the label
      var editItem = $(this).prev('input[type="text"]').val();
      var editLabel = parent.find('label');
      editLabel.html(editItem);
      //remove edit class
      parent.removeClass('beingEdited');
      $('button.edit').removeClass('glyphicon-ok-circle');
      $('button.edit').addClass('glyphicon-pencil');
    };

  });

    $('ul').on('click', '.edit',function(){
    //get parent
    var parent = $(this).parent();
    //check parent class
    if (!parent.hasClass('editMode')) {
      parent.addClass('editMode');
    }else if (parent.hasClass('editMode')) {
      //grab value entered in input and set as label
      var editTask = $(this).prev('input[type="text"]').val();
      var editLabel = parent.find('label');
      editLabel.html(editTask);
      //remove edit class
      parent.removeClass('editMode');
    };

  });
