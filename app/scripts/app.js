
'use strict';

$(document).ready(function(){
// If the user hits enter in the text input, click the button
  $('#new-item').keydown(function(event){
    if(event.keyCode === 13){
      $('button#add').click();
    }
  });

//ADD ITEM
  $('button#add').on('click',function(){
    //get input's value
    var newItem = $('#new-item').val();
    //check for empty value
    if(newItem === '') {
      //show the alert message
      $('.warning').html('<i class="fa fa-warning"></i> Item was not added').show();
    }else{
      //hide the warning message
      $('.warning').hide();
      //generate and add new list item
      var newListItem = '<li>';
      newListItem+='<input class="btn btn-success left" type="checkbox">';
      newListItem+='<label class="itemName left" for="itemName">'+newItem+'</label>';
      newListItem+='<input type="text" class="inputItem left" id="itemName">';
      newListItem+='<button class="delete btn btn-danger right glyphicon glyphicon-remove-circle" data-toggle="tooltip" data-placement="left" title="Delete Item"></button>';
      newListItem+='<button class="add-user btn btn-success right glyphicon glyphicon-user" data-toggle="tooltip" data-placement="left" title="Assign to User"></button>';
      newListItem+='<button class="notes btn btn-success right glyphicon glyphicon-comment" data-toggle="collapse" data-placement="left" title="Add Notes"></button>';
      newListItem+='<button class="edit btn btn-success right glyphicon glyphicon-edit" data-toggle="tooltip" data-placement="left" title="Rename Item"></button>';
      newListItem+='<div class="clear"><span class="assigned">Assigned To: </span>';
      newListItem+='<span class="assignedTo"></span></div>';
      newListItem+='<div class="collapse"><div class="notes-panel"><textarea class="form-control" id="note" rows="3"></textarea></div></div>';
      newListItem+='</li>';

      //append to the item list
      $('ul#incomplete-items').append(newListItem).hide().fadeIn(300);
      $('.inputItem').val(newItem);
      //empty input value
      $('#new-item').val('');
    }//end else statement
    countItem();
  });

//EDIT ITEM
  //user clicks on edit button
  $('ul').on('click','.edit',function(){
    //get its parent li
    var parent = $(this).parent();
    //check its parent  class
    if (!parent.hasClass('beingEdited')) {
      parent.addClass('beingEdited');
      $('button.edit').removeClass('glyphicon-edit');
      $('button.edit').addClass('glyphicon-check');
    }else if (parent.hasClass('beingEdited')) {
      //grab the value entered in the input and set as the label
      var editItem = parent.find('input[type="text"]').val();
      var editLabel = parent.find('label');
      editLabel.html(editItem);
      //remove edit class
      parent.removeClass('beingEdited');
      $('button.edit').removeClass('glyphicon-check');
      $('button.edit').addClass('glyphicon-edit');
    }
  });

  //EDIT TTILE
  //user clicks on edit button
  $('ul').on('click','.title',function(){
    //get its parent li
    var parent = $(this).parent();
    //check its parent  class
    if (!parent.hasClass('beingEdited')) {
      parent.addClass('beingEdited');
    }else if (parent.hasClass('beingEdited')) {
      //grab the value entered in the input and set as the label
      var editItem = parent.find('input[type="text"]').val();
      var editLabel = parent.find('label');
      editLabel.html(editItem);
      //remove edit class
      parent.removeClass('beingEdited');
    }
  });

//ADD USER TO ITEM
  //user clicks on add user button
  $('ul').on('click', '.add-user',function(){
    //get its parent li
    var parent = $(this).parent(),
        editItem,
        editLabel = parent.find('span.assignedTo');
    $('#editItem').modal();
    $('#selectUsers').chosen({width: '95%'});
    $('#editItem').on('hidden.bs.modal', function () {
      editItem = $('#selectUsers').val();
      editLabel.html(editItem);
      //unbind the modal from the li
      $('#editItem').unbind();
    });
  });

//ADD NOTES TO ITEM
  $('ul').on('click', '.notes',function(){
    //get its parent (li)
    var parent = $(this).parent(),
        panel = parent.find('.collapse');
        panel.collapse('toggle');
  });

//SHOW COMPETED
  $('.show-checked').on('click',function(){
    if ($(this).hasClass('glyphicon-chevron-right')){
      $(this).removeClass('glyphicon-chevron-right');
      $(this).addClass('glyphicon-chevron-down');
    }else{
      $(this).removeClass('glyphicon-chevron-down');
      $(this).addClass('glyphicon-chevron-right');
    }
    $('#completed-items').collapse('toggle');
  });

//COMPLETE ITEM
  $('ul').on('change','input[type="checkbox"]', function(){
    //get grandparent
    var grandparent = $(this).parent().parent();
    //get parent
    var parent = $(this).parent();
    //check which ul the li is under
    if (grandparent.is('#incomplete-items')) {
      parent.remove();
      $('#completed-items').append(parent);
    }else if(grandparent.is('#completed-items')){
      parent.remove();
      $('#incomplete-items').append(parent).hide().fadeIn(300);
    }
    countItem();
  });

//DELETE ITEM
  $('ul').on('click','.delete',function(){
    $(this).parent().remove();
    countItem();
  });//end delete function

//SHARE LIST
  $('.select-share').chosen({width:'100%'});
  $('.footer').on('click', '.shareList', function(){
    //get its parent (li)
    // var parent = $(this).parent(),
    var shared = '',
        editItem,
        editLabel = $('.sharedWith');
    $('#shareList').modal();
    $('#shareList').on('hidden.bs.modal', function () {
  // Modify select input with Chosen.js
      editItem = $('.select-share').val();
      $.each(editItem, function(index,value){
        shared += value + ' ';
      });
      editLabel.html(shared);
      //unbind the modal from the li
      $('#shareList').unbind();
    });
  });
$('.chosen-select').chosen();

//NEW LIST
  $('.footer').on('click','.newList',function(){
    location.reload(true);
  });

//EMAIL LIST
  $('.mail-select').chosen({width:'100%'});
  $('.footer').on('click', '.mailList', function(){
    var shared = '',
        editItem,
        editLabel = $('.sharedWith');
    $('#mailList').modal();
    $('#mailList').on('hidden.bs.modal', function () {
  // Modify select input with Chosen.js
      editItem = $('.mail-select').val();
      $.each(editItem, function(index,value){
        shared += value + ' ';
      });
      editLabel.html(shared);
      //unbind the modal from the li
      $('#mailList').unbind();
    });
  });


//ITEM COUNTER
  function countItem(){
    var remainItem = $('#incomplete-items li').length;
    $('#counter').hide().fadeIn(300).html(remainItem);
  }
  countItem();
});