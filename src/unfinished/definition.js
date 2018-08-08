// Copyright 2009 Google Inc. All Rights Reserved.

/**
 * @fileoverview Description of file, its uses and information
 * about its dependencies.
 * @author user@google.com (Firstname Lastname)
 */

'use strict';

/**
 * Class making something fun and easy.
 * @param {string} arg1 An argument that makes this more interesting.
 * @param {Array.<number>} arg2 List of numbers to be processed.
 * @constructor
 * @extends {goog.Disposable}
 */
class poppetry {
    // We care about 1. receiver_contact 2. receiver_address 
    var id;
    var senderName;
    var senderId;
    var senderContact;
    var senderAddress;
    var senderPostalCode; // HD code. Not national postcode.
    var senderPostalCode0; // National Postcode.
    var senderPostalCode1; // Shipper Postcode.
    var receiverName;
    var receiverId;
    var receiverContact;
    var receiverAddress;
    var receiverPostalCode; // HD code. Not national postcode.
    var receiverPostalCode0; // National Postcode.
    var receiverPostalCode1; // Shipper Postcode.
    var priority;
    var shipperName;
    var shipperBarCode;
}

class campus {
    var id;
    var name;
    var address;
    var postalCode; // Mark: the postcode is tree model. use 000 present all.
    var size;
    var position {
        var longitude;
        var latitude;
    }
    var contact;
}

class xinbox {
    var id;
    var identifier;
    var managedBy;
    var latestLocation {
        var longitude;
        var latitude;
    }
    var grid {
        var gridCount;
        // predefined: 1 as one; 2 as upper and lower; 3 as upper, middler, lower 
        var gridLayout;
    } 
    var homeSite; //xinboxSiteId
    var originSite;
    var previousSite;
    var currentSite;
    var nextSite;
    var passbySite; // It is a List.
    var timeToPick;
    var timeToNextSite;
    var waitingTime;
}

// TODO: use Functional Programming to refine the class definition.
// class xinbox {
//     open() {
//         this.state = 'open';
//     }

//     close() {
//         this.state = 'closed';
//     }

//     isOpen() {
//         return this.state === 'open';
//     }
// }

class xinboxDoor {
    var id;
    var status;
    var inXinboxId;
    // From Left to right, from up to down. 
    // Consider with grid_layout and grid_count together.
    // ofXinboxSubslotID = 1 means the up-left grid in 'this' xinBox.
    var ofXinboxSlotId; 
}
class xinboxSlot {
    var id;
    var status;
    var inXinboxId;
    // From Left to right, from up to down. 
    // Consider with grid_layout and grid_count together.
    // ofXinboxSubslotID = 1 means the up-left grid in 'this' xinBox.
    var ofXinboxSlotId; 
}
class xinboxSite {
    var id;
    var identifier;
    var postalCode;
    var longitude;
    var latitude;
    var size;
    var capacity;
}

/**
 * Converts text to some completely different text. (For Methods.)
 * @param {string} arg1 An argument that makes this more interesting.
 * @return {string} Some return value.
 */

 /**
 * Operates on an instance of MyClass and returns something. (For Functions)
 * @param {project.MyClass} obj Instance of MyClass which leads to a long
 *     comment that needs to be wrapped to two lines.
 * @return {boolean} Whether something occured.
 */