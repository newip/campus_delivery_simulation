'use strict';

class poppetry {
    // We care about 1. receiver_contact 2. receiver_address 
    var sender_name;
    var sender_id;
    var sender_contact;
    var sender_address;
    var sender_postcode; // HD code. Not national postcode.
    var sender_postcode0; // National Postcode.
    var sender_postcode1; // Shipper Postcode.
    var receiver_name;
    var receiver_id;
    var receiver_contact;
    var receiver_address;
    var receiver_postcode; // HD code. Not national postcode.
    var receiver_postcode0; // National Postcode.
    var receiver_postcode1; // Shipper Postcode.
    var shipper_name;
    var shipper_barcode;
}

class campus {
    var id;
    var name;
    var address;
    var postcode; // Mark: the postcode is tree model. use 000 present all.
    var size;
    var position [
        longitude,
        latitude
    ];
    var contact;
}

class xinbox {
    var id;
    var latest_location [
        longitude,
        latitude
    ];
    var grid_count;
    // predefined: 1 as one; 2 as upper and lower; 3 as upper, middler, lower 
    var grad_layout; 
}

class xinbox_grid {
    var id;
    var status;
    var xinbox_id;
    // From Left to right, from up to down. Consider with grid_layout and grid_count together.
    var xinbox_subslot_id; 
}

